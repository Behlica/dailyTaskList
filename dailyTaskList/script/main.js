const frm = document.querySelector("form")
const dvQuadro = document.querySelector("#divQuadro")

frm.addEventListener("submit", (e) => {
    e.preventDefault()

    const tarefa = frm.inTarefa.value

    //Criar o elemento h5
    const h5 = document.createElement("h5")
    //Cria um Texto
    const texto = document.createTextNode(tarefa)
    //Definindo que texto será filho de h5
    h5.appendChild(texto)
    //Definindo que h5 será filho de dvQuadro
    dvQuadro.appendChild(h5)

    frm.inTarefa.value = ''
    frm.inTarefa.focus()
})
frm.btSelecionar.addEventListener("click", () => {
    //obtem as tags h5
    const tarefas = document.querySelectorAll("h5")
    //aplicando uma validação 
    if (tarefas.length == 0) {
        alert("Não há tarefas para selecionar")
        return
    }
    let aux = -1
    for (let i = 0; i < tarefas.length; i++) {

        //se a tag é da class tarefa-selecionada (está selsecionada)
        if (tarefas[i].className === "tarefa-selecionada") {
            tarefas[i].className = "tarefa-normal"
            aux = i
            break
        }
    }
    if (aux == tarefas.length - 1) {
        aux = - 1
    }
    tarefas[aux + 1].className = "tarefa-selecionada"
})
frm.btRetirar.addEventListener("click", () => {
    const tarefas = document.querySelectorAll("h5")

    let aux = -1
    tarefas.forEach((tarefa, i) => {
        if (tarefa.className == "tarefa-selecionada") {
            aux = i
        }
    })
    if (aux == -1) {
        alert("Selecione uma tarefa para removê-la")
        return
    }
    if (confirm(`Confirmar Exclusão de ` + tarefas[aux].innerText + "?")) {
        dvQuadro.removeChild(tarefas[aux])
    }
})
frm.btGravar.addEventListener("click", ()=>{

    const tarefas = document.querySelectorAll("h5")

    if(tarefas.length == 0){
        alert("Não Há tarefas selecionadas para Gravar")
        return
    }

    let dados = ""

    tarefas.forEach(tarefa => {
        dados+= tarefa.innerText + ";"
    })
    localStorage.setItem("tarefasDia", dados.slice(0, -1))

    if(localStorage.getItem("tarefasDia")){
        alert("OK! Tarefas Salvas")
    }
})
window.addEventListener("load", ()=>{
    if(localStorage.getItem("tarefasDia")){
        const dados = localStorage.getItem("tarefasDia").split(";")

        dados.forEach(dado => {
            const h5 = document.createElement("h5")
            const texto = document.createTextNode(dado)
            h5.appendChild(texto)
            dvQuadro.appendChild(h5)
        })
    }
})

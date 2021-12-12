let body = document.querySelector("body");
let main = document.querySelector("main");
let tabelaElemento = document.querySelector("#tabela");
let formElemento = document.querySelector("#formulario")
let buscaFila = document.querySelector("#buscafila")

body.onload = function() {
    console.log("Inicializando o body");
    buscarPessoasFila();
    setInterval(buscarPessoasFila, 10000);
    FomrmularioPessoa()
}

let cont = 1;

function buscarPessoasFila() {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const listapessoas = JSON.parse(this.responseText);
        let lista = ['<table>'+'<tr>'+'<th>Pessoa</th>'+'<th>Classificação</th>'+'<th>Numero Fila</th>'+ '</tr>'];
        for (let i = 0; i < listapessoas.length; i++) {
            lista += '<tr>'
            lista += `<td>${listapessoas[i].pessoaid}</td>`;
            lista += `<td>${listapessoas[i].classificacao}</td>`;
            lista += `<td>${listapessoas[i].nfila}</td>`;
            lista += '</tr>'
        }
        lista += '</table>';
        buscaFila.innerHTML = lista;
    }
        xhttp.open("GET", "http://localhost:3000/fila/listar", true);
        xhttp.send();
}

function FomrmularioPessoa() {
    const formulario = `<form id="formPessoas">
        <label for='nomeInput'>Nome:</label>
        <input id='nomeInput'> </br>
        <label type='number' for='idadeInput'>Idade:</label>
        <input id='idadeInput'> </br>
        <input type="submit" value="Salvar">
    </form>`;

    formElemento.innerHTML = formulario;

    const formPessoas = document.querySelector("#formPessoas");
    formPessoas.onsubmit = function(event) {
        event.preventDefault();
        const nomeInput = document.querySelector("#nomeInput");
        const idadeInput = document.querySelector("#idadeInput");
        if(nomeInput.value && idadeInput.value) {
            let pessoas = new Object();
            pessoas.nome = nomeInput.value;
            pessoas.idade = idadeInput.value;
            //Chamada AJAX para inserir produto
            inserirPessoas(pessoas);
            nomeInput.value="";
            idadeInput.value="";
        }
        else {
            alert("Campos Nome e Idade obrigatórios");
        }
    }
}

function inserirPessoas(pessoasObj) {
    console.log(pessoasObj.nome, pessoasObj.idade)
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const pessoas = JSON.parse(this.responseText);
        alert(`Pessoa ${pessoas.nome} cadastrado com sucesso!`);
        buscarPessoasFila();

    }
    xhttp.open("POST", "localhost:8080/pessoas/inserir", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(pessoasObj))

}

/*
 //em construção
function chamarFila() {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const listapessoas = JSON.parse(this.responseText);
        for (let i = 0; i < listapessoas.length; i++) {
            buscaFila.innerHTML = lista;
        }
            xhttp.open("GET", "http://localhost:3000/fila/listar", true);
            xhttp.send();
        }
    }

 */
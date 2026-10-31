var titulo= document.getElementById("titulo");
var autor= document.getElementById("autor");
var capa= document.getElementById("capa");
var nota= document.getElementById("nota");
var botao= document.getElementById("botao");
var formulario= document.getElementById("formulario");
var lista= document.getElementById("lista");

const livros = [];

formulario.addEventListener("submit", function(evento){
    evento.preventDefault();
    const livro = {
        titulo: titulo.value,
        autor: autor.value,
        capa: capa.value,
        nota: nota.value
    }
    livros.push(livro);
    console.log(livros);
})

function renderizar(){
    lista.innerHTML = "";
    livros.forEach()
}
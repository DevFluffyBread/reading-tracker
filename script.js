var titulo= document.getElementById("titulo");
var autor= document.getElementById("autor");
var capa= document.getElementById("capa");
var nota= document.getElementById("nota");
var botao= document.getElementById("botao");
var formulario= document.getElementById("formulario");
var lista= document.getElementById("lista");

const livros = JSON.parse(localStorage.getItem("livros")) || [];

formulario.addEventListener("submit", function(evento){
    evento.preventDefault();

    const tituloLimpo = titulo.value.trim();
    const autorLimpo = autor.value.trim();

    if(!tituloLimpo || !autorLimpo){
    alert("Preencha os campos de título e autor.");
    return;
}
    const livro = {
        titulo: tituloLimpo,
        autor: autorLimpo,
        capa: capa.value.trim(),
        nota: nota.valueAsNumber
    };

    livros.push(livro);
    localStorage.setItem("livros", JSON.stringify(livros));

    renderizar();
});

function renderizar() {
    lista.innerHTML = "";

    livros.forEach(function (livro) {
        const item = document.createElement("div");

        const tituloLivro = document.createElement("h2");
        tituloLivro.textContent = livro.titulo;

        const autorLivro = document.createElement("p");
        autorLivro.textContent = `Autor: ${livro.autor}`;

        const notaLivro = document.createElement("p");
        notaLivro.textContent = `Nota: ${livro.nota}/10`;

        item.appendChild(tituloLivro);
        item.appendChild(autorLivro);
        item.appendChild(notaLivro);

        if (livro.capa) {
            const imagem = document.createElement("img");
            imagem.src = livro.capa;
            imagem.alt = `Capa de ${livro.titulo}`;
            imagem.width = 120;

            item.appendChild(imagem);
        }

        lista.appendChild(item);
    });
}
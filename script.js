var titulo= document.getElementById("titulo");
var autor= document.getElementById("autor");
var capa= document.getElementById("capa");
var nota= document.getElementById("nota");
var formulario= document.getElementById("formulario");
var lista= document.getElementById("lista");
let idEmEdicao = null;
const botaoSalvar = document.getElementById("botao");

let livros = [];

try {
    const dadosSalvos = localStorage.getItem("livros");
    const dados = dadosSalvos ? JSON.parse(dadosSalvos) : [];
    livros = Array.isArray(dados)
    ? dados.map(function (livro) {
        return {
            ...livro,
            id: livro.id || crypto.randomUUID()
        };
    })
    : [];

    localStorage.setItem("livros", JSON.stringify(livros)); 

} catch (erro) {
    console.error("Não foi possível carregar os livros:", erro);
}

formulario.addEventListener("submit", function(evento){
    evento.preventDefault();

    const tituloLimpo = titulo.value.trim();
    const autorLimpo = autor.value.trim();

    if(!tituloLimpo || !autorLimpo){
        alert("Preencha os campos de título e autor.");
        return;
    }

    const livro = {
        id: idEmEdicao ?? crypto.randomUUID(),
        titulo: tituloLimpo,
        autor: autorLimpo,
        capa: capa.value.trim(),
        nota: nota.valueAsNumber
    };

    try {
        const livrosAtualizados = idEmEdicao === null
        ? [...livros, livro]
        : livros.map(function (livroAtual) {
        return livroAtual.id === idEmEdicao
            ? { ...livroAtual, ...livro }
            : livroAtual;
    });

        localStorage.setItem(
            "livros",
            JSON.stringify(livrosAtualizados)
        );

        livros = livrosAtualizados;
    } catch (erro) {
        console.error("Não foi possível salvar o livro:", erro);

        alert(
            "Não foi possível salvar o livro. " +
            "O armazenamento pode estar cheio ou bloqueado."
        );

        return;
    }

    idEmEdicao = null;
    botaoSalvar.textContent = "Adicionar Livro";

    renderizar();
    formulario.reset();
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

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", function () {
        excluirLivro(livro.id);
    });

        const botaoEditar = document.createElement("button");
        botaoEditar.type = "button";
        botaoEditar.textContent = "Editar";

        botaoEditar.addEventListener("click", function () {
        editarLivro(livro.id);
    });

        item.appendChild(botaoEditar);
        item.appendChild(botaoExcluir);
        lista.appendChild(item);
    });
}

renderizar();

function excluirLivro(id) {
    const confirmado = confirm("Deseja excluir este livro?");

    if (!confirmado) {
        return;
    }

    const livrosAtualizados = livros.filter(function (livro) {
        return livro.id !== id;
    });

    try {
        localStorage.setItem(
            "livros",
            JSON.stringify(livrosAtualizados)
        );

        livros = livrosAtualizados;
    } catch (erro) {
        console.error("Não foi possível excluir o livro:", erro);
        alert("Não foi possível salvar a exclusão. Tente novamente.");
        return;
    }

    if (idEmEdicao === id) {
        idEmEdicao = null;
        botaoSalvar.textContent = "Adicionar Livro";
        formulario.reset();
    }

    renderizar();
    }

function editarLivro(id) {
    const livro = livros.find(function (livro) {
        return livro.id === id;
    });

    if (!livro) {
        return;
    }

    idEmEdicao = id;

    titulo.value = livro.titulo;
    autor.value = livro.autor;
    capa.value = livro.capa;
    nota.value = livro.nota;

    botaoSalvar.textContent = "Salvar alterações";
    titulo.focus();
}
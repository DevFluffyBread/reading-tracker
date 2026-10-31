var titulo= document.getElementById("titulo");
var autor= document.getElementById("autor");
var capa= document.getElementById("capa");
var nota= document.getElementById("nota");
var formulario= document.getElementById("formulario");
var lista= document.getElementById("lista");
let idEmEdicao = null;
const botaoSalvar = document.getElementById("botao");
const statusLeitura = document.getElementById("status");

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
        nota: nota.value === "" ? null : nota.valueAsNumber,
        status: statusLeitura.value,
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
    atualizarObrigatoriedadeNota();
});

function renderizar() {
    lista.innerHTML = "";

    livros.forEach(function (livro) {
        const item = document.createElement("div");
        item.className = "livro";

        const tituloLivro = document.createElement("h2");
        tituloLivro.textContent = livro.titulo;

        const autorLivro = document.createElement("p");
        autorLivro.className = "livro-autor";
        autorLivro.textContent = `Autor: ${livro.autor}`;

        const notaLivro = document.createElement("p");
        notaLivro.textContent = livro.nota == null
        ? "Sem avaliação"
         : `Nota: ${livro.nota}/10`;

        const nomesStatus = {
            "quero-ler": "Quero ler",
            lendo: "Lendo",
            concluido: "Concluído"
    };

       
        const statusAtual = livro.status ?? "concluido";

        const statusLivro = document.createElement("p");
        statusLivro.className = "livro-status";
        statusLivro.dataset.status = statusAtual;
        statusLivro.textContent = nomesStatus[statusAtual];

        item.appendChild(tituloLivro);
        const espacoCapa = document.createElement("div");
        espacoCapa.className = "livro-capa";

        if (livro.capa) {
        const imagem = document.createElement("img");
        imagem.src = livro.capa;
        imagem.alt = `Capa de ${livro.titulo}`;
        imagem.loading = "lazy";

        espacoCapa.appendChild(imagem);
        } else {
         const textoCapa = document.createElement("span");
         textoCapa.textContent = livro.titulo;

         espacoCapa.appendChild(textoCapa);
        }

        item.prepend(espacoCapa);

        item.appendChild(autorLivro);
        item.appendChild(notaLivro);
        item.appendChild(statusLivro);

        
        

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

        const acoesLivro = document.createElement("div");
        acoesLivro.className = "livro-acoes";

        acoesLivro.appendChild(botaoEditar);
        acoesLivro.appendChild(botaoExcluir);

        item.appendChild(acoesLivro);
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
        atualizarObrigatoriedadeNota();
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
    statusLeitura.value = livro.status ?? "concluido";
    atualizarObrigatoriedadeNota();

    botaoSalvar.textContent = "Salvar alterações";
    titulo.focus();
}

function atualizarObrigatoriedadeNota() {
    nota.required = statusLeitura.value === "concluido";
}

statusLeitura.addEventListener(
    "change",
    atualizarObrigatoriedadeNota
);

atualizarObrigatoriedadeNota();
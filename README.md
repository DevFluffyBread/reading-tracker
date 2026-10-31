# Reading Tracker

O **Reading Tracker** é um projeto simples para registrar e acompanhar livros lidos. Ele permite adicionar livros com título, autor, nota e, opcionalmente, o endereço da imagem da capa.

## Funcionalidades

- Cadastro de livros com título, autor e nota.
- Campo opcional para a URL da capa.
- Exibição dos livros cadastrados, incluindo a capa quando informada.
- Edição de livros: selecione **Editar** para carregar os dados no formulário e, depois de alterá-los, escolha **Salvar alterações**.
- Persistência dos dados no navegador usando `localStorage`, para que a lista continue disponível ao reabrir a página no mesmo navegador.

## Tecnologias

- HTML
- JavaScript
- `localStorage` do navegador

## Como executar

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` em um navegador.
3. Preencha os dados do livro e selecione **Adicionar Livro**.

Não é necessário instalar dependências ou iniciar um servidor para usar a versão atual do projeto.

## Observação

Os livros são salvos localmente no navegador e não são sincronizados entre dispositivos ou navegadores. Limpar os dados do navegador pode apagar os registros salvos.

# Reading Tracker

O **Reading Tracker** é uma aplicação web para organizar sua biblioteca pessoal e acompanhar o andamento das leituras. Cadastre livros com título, autor e status, adicione uma capa opcional e avalie as obras concluídas.

## Funcionalidades

- Cadastro de livros com título e autor, além de URL de capa e nota opcionais.
- Organização por status de leitura: **Quero ler**, **Lendo** e **Concluído**.
- Nota de 0 a 10, em incrementos de 0,5; a avaliação é obrigatória para livros concluídos.
- Exibição das capas informadas ou do título como substituto quando não há capa.
- Animação nas capas ao passar o cursor.
- Edição dos dados de um livro pelo botão **Editar** e remoção pelo botão **Excluir**.
- Salvamento dos livros no `localStorage`, mantendo os dados disponíveis ao reabrir a aplicação no mesmo navegador.

## Tecnologias

- HTML
- JavaScript
- `localStorage` do navegador

## Como executar

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` em um navegador.
3. Preencha o formulário e selecione **Adicionar Livro**.
4. Use **Editar** ou **Excluir** nos livros cadastrados para gerenciá-los.

Não é necessário instalar dependências ou iniciar um servidor para usar a versão atual do projeto.

## Observação

Os livros são salvos localmente no navegador e não são sincronizados entre dispositivos ou navegadores. Limpar os dados do navegador pode apagar os registros salvos. A animação das capas é acionada por cursor e pode não estar disponível em dispositivos com tela sensível ao toque.

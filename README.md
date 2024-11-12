# E-Commerce Full Stack Application

Este é um projeto de e-commerce completo com front-end em React, Vite e TypeScript e um back-end em Node.js, TypeScript, Sequelize e Express.

## 📋 Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Contribuições](#contribuições)
- [Licença](#licença)

## 📖 Sobre o Projeto

Este é um sistema de e-commerce com autenticação de usuários, gerenciamento de produtos e carrinho de compras. A aplicação é dividida em duas partes principais:
- **Client**: Interface de usuário construída em React com Vite e TypeScript.
- **Server**: API RESTful em Node.js com Express, TypeScript e Sequelize para gerenciar operações com banco de dados.

## 🚀 Funcionalidades

- Autenticação e registro de usuários.
- Listagem de produtos e visualização de detalhes.
- Adição de produtos ao carrinho.
- Finalização de pedido com cálculo de valores.

## 🛠 Tecnologias Utilizadas

- **Front-End**:
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [Typescript](https://www.typescriptlang.org/)
- **Back-End**:
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [Sequelize](https://sequelize.org/) (ORM para manipulação de banco de dados)
  - [Typescript](https://www.typescriptlang.org/)
  - JWT para autenticação de usuário
- **Banco de Dados**:
  - [SQLite3](https://www.sqlite.org/)

## 📝 Pré-requisitos

Antes de rodar o projeto, certifique-se de ter as seguintes ferramentas instaladas:
- [Node.js](https://nodejs.org/) (versão 14+)
- [Git](https://git-scm.com/)
- **Banco de Dados**: SQLite3 ou outro banco de dados compatível com Sequelize.

## ▶️ Como Rodar o Projeto

### 1. Clonar o repositório

Clone o repositório e navegue até o diretório do projeto:

```bash
git clone https://github.com/smViana19/e-commerce.git
cd e-commerce
```
### 2. Configurar o Back-End
Agora, configure a parte do servidor:

1. Acesse o diretório do servidor: 
```bash
cd server
```
2. Instale as dependências do backend:
```bash
npm install
```
3. Copie o arquivo .env.example para .env e configure as variáveis de ambiente de acordo com suas necessidades:
```bash
cp .env.example .env
```
4. Execute as migrações do banco de dados para criar as tabelas necessárias:
```bash
npx sequelize-cli db:migrate
```
5. Inicie o servidor:
```bash
npm run dev
```
O servidor estará rodando em http://localhost:3000 (ou a porta configurada).
### 3. Configurar o Front-End
Agora, configure o lado do cliente:
1. Acesse o diretório do frontend:
```bash
cd ../client
```
2. Instale as dependências do frontend:
```bash
npm install
```
3. Inicie o front-end:
```bash
npm run dev
```
O front-end estará disponível em http://localhost:5173 (ou a porta configurada).

### 🤝 Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou um pull request.

# E-Commerce Full Stack Application

Este é um projeto de e-commerce completo com front-end em React, Vite e TypeScript e um back-end em Node.js, TypeScript, Sequelize e Express.

## 📋 Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Testes](#testes)
- [Contribuições](#contribuições)
- [Licença](#licença)

## 📖 Sobre o Projeto

Este é um sistema de e-commerce com autenticação de usuários, gerenciamento de produtos e carrinho de compras. É dividido em duas partes principais:
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
  - TypeScript
- **Back-End**:
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [Sequelize](https://sequelize.org/) (ORM para manipulação de banco de dados)
  - TypeScript
  - JWT para autenticação de usuário
- **Banco de Dados**:
  - [SQLITE3](https://www.sqlite.org/)

## 📝 Pré-requisitos

- Node.js (versão 14+)
- SQLITE ou outro banco de dados compatível com Sequelize
- Git

## ▶️ Como Rodar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
2. Configurar o Back-End
bash
Copy code
cd server
cp .env.example .env

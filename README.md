# 📌 Documentação do Projeto BackEnd 2

## 📖 Sobre o Projeto

O projeto é um sistema de venda de ingressos desenvolvido com Node.js, Express e MongoDB (usando Mongoose). Ele permite o gerenciamento de usuários, tipos de ingressos e controle de compras. A interface é renderizada com Mustache e apenas é para usuários, assim como descrito nos requisitos do projeto.

## 🚀 Tecnologias Utilizadas

Node.js

Express.js

MongoDB (via Mongoose)

Mustache (para templates da interface)

Mongoose (ODM para MongoDB)

Git (controle de versão)

## 📂 Estrutura principal do Projeto

Projeto-BackEnd-2/
│── node_modules/         # Dependências do projeto (ignorado pelo Git)
│── views/                # Templates Mustache
│── routes/               # Definição de rotas
│── models/               # Modelos do banco de dados (Mongoose)
│── controllers/          # Lógica das requisições
│── .gitignore            # módulos do node ignorados pelo Git
│── package.json          # Configuração do projeto e dependências
│── server.js             # Ponto de entrada da aplicação

## ⚙️ Configuração do Ambiente

### 1️⃣ Clonar o repositório

git clone https://github.com/LuisAugust01/Projeto-BackEnd-2.git
cd Projeto-BackEnd-2

### 2️⃣ Instalar as dependências

npm install

### 3️⃣ Iniciar o servidor

npm start

O servidor estará rodando em: http://localhost:3000

## 🛠️ Endpoints Principais (para se utilizar no PostMan por exemplo)

### 🔹 Usuários (tanto comum quanto admin) (OBS: para alterar/deletar usuários está sendo necessário manipular pelo BD, não tive tempo para fazer isso)

POST http://localhost:3000/api/auth/registro - Criar um novo usuário

POST http://localhost:3000/api/auth/login - Fazer login

### 🔹 Ingressos (aqui temos CRUD completo)

POST http://localhost:3000/api/ingressos/criar - Criar um novo ingresso

GET http://localhost:3000/api/ingressos - Listar ingressos

GET http://localhost:3000/api/ingressos/(substitua aqui pelo ip de ingresso) - Busca específica de ingresso

PUT http://localhost:3000/api/ingressos/atualizar/(substitua aqui pelo ip de ingresso) - Modificar dados de um ingresso

DELETE http://localhost:3000/api/ingressos/deletar/(substitua aqui pelo ip de ingresso) - Deletar um ingresso do BD

### 🔹 Compras

POST /comprar - Comprar ingressos

GET /compras - Listar histórico de compras do usuário logado

## 🛠️ Rotas utilizadas no frontend:

### Login

http://localhost:3000 - Tela de Login

http://localhost:3000/registro - Tela de criação de usuário

### Compras

http://localhost:3000/api/ingressos - Tela de pesquisa/compras

### Histórico de compras

http://localhost:3000/api/ingressos/historico - Tela de histórico

### Telas de conexão

http://localhost:3000/home - Tela de home

http://localhost:3000/sucesso - Tela de conclusão/retorno para a home

## 📝 Observações

O banco de dados MongoDB deve estar rodando para que o sistema funcione corretamente.

O projeto utiliza Mustache para renderizar as páginas da interface.

O arquivo .gitignore já está configurado para ignorar node_modules.

##📌 Autor: Luís Augusto Casa Grande Fonseca

Repositório: https://github.com/LuisAugust01/Projeto-BackEnd-2

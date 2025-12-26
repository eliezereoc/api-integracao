# API de Integração

![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?logo=node.js)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Express](https://img.shields.io/badge/express-5.2.1-lightgrey?logo=express)
![MySQL](https://img.shields.io/badge/mysql-latest-blue?logo=mysql)
![GitHub repo size](https://img.shields.io/github/repo-size/eliezereoc/api-integracao)
![GitHub issues](https://img.shields.io/github/issues/eliezereoc/api-integracao)

Uma API RESTful desenvolvida com Node.js e Express para integração com serviços externos de posts. A aplicação permite sincronizar dados de uma API externa, armazenar posts em um banco de dados MySQL e gerenciar operações CRUD completas.

## 📋 Funcionalidades

### 1. **Sincronização com API Externa**
- Fetch automático de posts de um serviço externo
- Armazenamento dos posts obtidos no banco de dados MySQL
- Endpoint: `POST /posts/sync/external`

### 2. **Gerenciamento de Posts (CRUD)**
- **Criar Post**: `POST /posts` - Adicionar novo post com userId, title e body
- **Listar Todos**: `GET /posts` - Recuperar todos os posts do banco de dados
- **Buscar por ID**: `GET /posts/:id` - Encontrar um post específico por ID
- **Filtrar por Usuário**: Posts podem ser consultados por userId

### 3. **Validação de Dados**
- Validação obrigatória de campos: userId, title e body
- Retorno de erros detalhados em caso de dados inválidos

### 4. **Persistência de Dados**
- Banco de dados MySQL com migrations automáticas
- Tabela `posts` com campos: id, userId, title, body
- Suporte a rollback de migrations

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js com Express.js
- **Banco de Dados**: MySQL com mysql2
- **Migrations**: Knex.js
- **HTTP Client**: Axios para requisições
- **Variáveis de Ambiente**: Dotenv
- **Desenvolvimento**: Nodemon para reload automático

## 📁 Estrutura do Projeto

```
src/
├── config/
│   └── database.js          # Configuração de banco de dados
├── controllers/
│   └── postController.js    # Controladores de requisições
├── database/
│   ├── connection.js        # Conexão com MySQL
│   └── migrations/          # Versionamento do banco
├── models/
│   └── postModel.js         # Modelos de dados
├── repositories/
│   └── postRepository.js    # Acesso aos dados
├── routes/
│   └── postRoutes.js        # Rotas da API
└── services/
    └── postService.js       # Lógica de negócio
```

## 🚀 Como Usar

### Instalação
```bash
npm install
```

### Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```
PORT=3000
API_EXTERNAL_URL=https://api-externa.com
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha
DB_NAME=api_integracao
```

### Executar Migrations
```bash
npm run migrate:latest
```

### Iniciar a Aplicação

**Desenvolvimento** (com auto-reload):
```bash
npm run dev
```

**Produção**:
```bash
npm start
```

## 📡 Endpoints da API

### Sincronizar Posts Externos
```http
POST /posts/sync/external
```
Busca posts de uma API externa e os armazena no banco.

**Resposta de Sucesso (200)**:
```json
{
  "status": "success",
  "message": "Posts obtidos e armazenados com sucesso."
}
```

### Listar Todos os Posts
```http
GET /posts
```

**Resposta (200)**:
```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "Título do Post",
    "body": "Conteúdo do post"
  }
]
```

### Obter Post por ID
```http
GET /posts/:id
```

**Resposta de Sucesso (200)**:
```json
{
  "id": 1,
  "userId": 1,
  "title": "Título do Post",
  "body": "Conteúdo do post"
}
```

**Resposta Erro (404)**:
```json
{
  "error": "Post not found"
}
```

### Criar Novo Post
```http
POST /posts
Content-Type: application/json

{
  "userId": 1,
  "title": "Novo Post",
  "body": "Conteúdo do novo post"
}
```

**Resposta de Sucesso (201)**:
```json
{
  "status": "success",
  "message": "Post criado ou atualizado com sucesso."
}
```

**Resposta Erro (400)**:
```json
{
  "error": "userId, title e body são obrigatórios"
}
```

## 📚 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor com reload automático |
| `npm start` | Inicia servidor em produção |
| `npm run migrate:latest` | Executa todas as migrations |
| `npm run migrate:rollback` | Desfaz a última migration |
| `npm run migrate:make` | Cria nova migration |
| `npm run seed:make` | Cria novo seed |
| `npm run seed:run` | Executa seeds |

## 📝 Notas

- A aplicação utiliza padrão MVC com separação de responsabilidades
- O serviço externo deve retornar posts no formato JSON
- O banco de dados é inicializado automaticamente via migrations
- Todos os erros retornam status HTTP apropriados

## 📄 Licença

MIT - Veja LICENSE para detalhes

## 👤 Autor

Eliézer de Oliveira
---

---

# 🇺🇸 Integration API

A RESTful API developed with Node.js and Express for integration with external post services. The application allows you to synchronize data from an external API, store posts in a MySQL database, and manage complete CRUD operations.

## 📋 Features

### 1. **External API Synchronization**
- Automatic fetching of posts from an external service
- Storage of obtained posts in MySQL database
- Endpoint: `POST /posts/sync/external`

### 2. **Post Management (CRUD)**
- **Create Post**: `POST /posts` - Add a new post with userId, title and body
- **List All**: `GET /posts` - Retrieve all posts from database
- **Search by ID**: `GET /posts/:id` - Find a specific post by ID
- **Filter by User**: Posts can be queried by userId

### 3. **Data Validation**
- Mandatory field validation: userId, title and body
- Detailed error returns in case of invalid data

### 4. **Data Persistence**
- MySQL database with automatic migrations
- `posts` table with fields: id, userId, title, body
- Support for migration rollback

## 🛠️ Technologies Used

- **Backend**: Node.js with Express.js
- **Database**: MySQL with mysql2
- **Migrations**: Knex.js
- **HTTP Client**: Axios for requests
- **Environment Variables**: Dotenv
- **Development**: Nodemon for automatic reload

## 📁 Project Structure

```
src/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   └── postController.js    # Request controllers
├── database/
│   ├── connection.js        # MySQL connection
│   └── migrations/          # Database versioning
├── models/
│   └── postModel.js         # Data models
├── repositories/
│   └── postRepository.js    # Data access
├── routes/
│   └── postRoutes.js        # API routes
└── services/
    └── postService.js       # Business logic
```

## 🚀 How to Use

### Installation
```bash
npm install
```

### Configure Environment Variables
Create a `.env` file in the project root:
```
PORT=3000
API_EXTERNAL_URL=https://api-externa.com
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=api_integracao
```

### Run Migrations
```bash
npm run migrate:latest
```

### Start the Application

**Development** (with auto-reload):
```bash
npm run dev
```

**Production**:
```bash
npm start
```

## 📡 API Endpoints

### Synchronize External Posts
```http
POST /posts/sync/external
```
Fetches posts from an external API and stores them in the database.

**Success Response (200)**:
```json
{
  "status": "success",
  "message": "Posts retrieved and stored successfully."
}
```

### List All Posts
```http
GET /posts
```

**Response (200)**:
```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "Post Title",
    "body": "Post content"
  }
]
```

### Get Post by ID
```http
GET /posts/:id
```

**Success Response (200)**:
```json
{
  "id": 1,
  "userId": 1,
  "title": "Post Title",
  "body": "Post content"
}
```

**Error Response (404)**:
```json
{
  "error": "Post not found"
}
```

### Create New Post
```http
POST /posts
Content-Type: application/json

{
  "userId": 1,
  "title": "New Post",
  "body": "New post content"
}
```

**Success Response (201)**:
```json
{
  "status": "success",
  "message": "Post created or updated successfully."
}
```

**Error Response (400)**:
```json
{
  "error": "userId, title and body are required"
}
```

## 📚 Available Scripts

| Command | Description |
|---------|-----------|
| `npm run dev` | Start server with automatic reload |
| `npm start` | Start server in production |
| `npm run migrate:latest` | Execute all migrations |
| `npm run migrate:rollback` | Undo last migration |
| `npm run migrate:make` | Create new migration |
| `npm run seed:make` | Create new seed |
| `npm run seed:run` | Execute seeds |

## 📝 Notes

- The application uses MVC pattern with separation of concerns
- The external service must return posts in JSON format
- Database is initialized automatically via migrations
- All errors return appropriate HTTP status codes

## 📄 License

MIT - See LICENSE for details

## 👤 Author

Eliézer de Oliveira
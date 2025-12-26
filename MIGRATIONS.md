# 🔄 Guia de Migrations - API Integração

Este guia documenta como trabalhar com migrations neste projeto usando **Knex.js**.

## 📚 Índice

- [O que são Migrations?](#o-que-são-migrations)
- [Configuração Inicial](#configuração-inicial)
- [Criar Nova Migration](#criar-nova-migration)
- [Estrutura de uma Migration](#estrutura-de-uma-migration)
- [Executar Migrations](#executar-migrations)
- [Comandos Disponíveis](#comandos-disponíveis)
- [Exemplos Práticos](#exemplos-práticos)
- [Boas Práticas](#boas-práticas)

---

## 🤔 O que são Migrations?

Migrations são arquivos de versionamento de banco de dados que permitem:
- Criar, modificar e deletar tabelas de forma controlada
- Versionar a estrutura do banco de dados
- Compartilhar mudanças de schema com a equipe
- Reverter alterações quando necessário
- Manter histórico de todas as mudanças do banco

---

## ⚙️ Configuração Inicial

### 1. Instalar Dependências

```bash
npm install knex --save-dev
```

### 2. Estrutura de Pastas

```
src/
  database/
    migrations/     # Migrations ficam aqui
    seeds/          # Seeds (dados de teste) ficam aqui
    connection.js   # Conexão com o banco
knexfile.js         # Configuração do Knex
```

### 3. Arquivo de Configuração

O arquivo [knexfile.js](knexfile.js) já está configurado com:
- Conexão com MySQL via variáveis de ambiente
- Diretório de migrations: `./src/database/migrations`
- Ambientes: development e production

---

## 🆕 Criar Nova Migration

### Comando Base

```bash
npm run migrate:make nome_da_migration
```

### Exemplos de Nomenclatura

```bash
# Criar tabela
npm run migrate:make create_users_table

# Adicionar coluna
npm run migrate:make add_email_to_users

# Modificar coluna
npm run migrate:make alter_users_status

# Criar índice
npm run migrate:make add_index_to_users_email

# Relacionamento
npm run migrate:make create_posts_users_relation
```

**Dica:** Use nomes descritivos que expliquem claramente o que a migration faz.

---

## 📝 Estrutura de uma Migration

Toda migration possui dois métodos:

### `up()` - Aplicar Mudanças

Executa as alterações no banco de dados.

### `down()` - Reverter Mudanças

Desfaz as alterações feitas pelo `up()`.

### Exemplo Básico

```javascript
export async function up(knex) {
  return knex.schema.createTable('nome_tabela', (table) => {
    // Definição da tabela
  });
}

export async function down(knex) {
  return knex.schema.dropTable('nome_tabela');
}
```

---

## ▶️ Executar Migrations

### Aplicar Todas Pendentes

```bash
npm run migrate:latest
```

### Reverter Última Migration

```bash
npm run migrate:rollback
```

### Reverter Todas as Migrations

```bash
npm run migrate:rollback --all
```

---

## 🛠️ Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run migrate:make <nome>` | Criar nova migration |
| `npm run migrate:latest` | Aplicar todas migrations pendentes |
| `npm run migrate:rollback` | Reverter última migration |
| `npm run migrate:status` | Ver status das migrations |
| `npm run seed:make <nome>` | Criar novo seed |
| `npm run seed:run` | Executar seeds |

---

## 💡 Exemplos Práticos

### 1. Criar Tabela Simples

```javascript
export async function up(knex) {
  return knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('slug', 100).unique();
    table.text('description');
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('categories');
}
```

### 2. Adicionar Coluna em Tabela Existente

```javascript
export async function up(knex) {
  return knex.schema.alterTable('posts', (table) => {
    table.string('thumbnail', 255).after('content');
    table.integer('views').unsigned().defaultTo(0);
  });
}

export async function down(knex) {
  return knex.schema.alterTable('posts', (table) => {
    table.dropColumn('thumbnail');
    table.dropColumn('views');
  });
}
```

### 3. Criar Relacionamento (Foreign Key)

```javascript
export async function up(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.integer('post_id').unsigned().notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.text('content').notNullable();
    table.timestamps(true, true);

    // Foreign Keys
    table.foreign('post_id').references('id').inTable('posts').onDelete('CASCADE');
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });
}

export async function down(knex) {
  return knex.schema.dropTable('comments');
}
```

### 4. Adicionar Índice

```javascript
export async function up(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.index('email');
    table.index(['created_at', 'status']);
  });
}

export async function down(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropIndex('email');
    table.dropIndex(['created_at', 'status']);
  });
}
```

### 5. Modificar Tipo de Coluna

```javascript
export async function up(knex) {
  return knex.schema.alterTable('posts', (table) => {
    table.text('content').alter(); // Mudar de string para text
  });
}

export async function down(knex) {
  return knex.schema.alterTable('posts', (table) => {
    table.string('content', 255).alter();
  });
}
```

### 6. Renomear Coluna

```javascript
export async function up(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.renameColumn('full_name', 'name');
  });
}

export async function down(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.renameColumn('name', 'full_name');
  });
}
```

---

## 🎯 Boas Práticas

### ✅ Fazer

1. **Sempre criar o método `down()`** - Permite reverter a migration
2. **Testar a reversão** - Executar rollback para garantir que funciona
3. **Nomes descritivos** - Use nomes claros como `create_users_table`
4. **Uma mudança por migration** - Facilita o controle e reversão
5. **Commitar migrations** - Versione no Git junto com o código
6. **Executar migrations em produção com cuidado** - Faça backup antes

### ❌ Evitar

1. **Editar migrations já executadas** - Crie uma nova migration
2. **Deletar migrations** - Isso pode quebrar o histórico
3. **Mudanças complexas em uma única migration** - Divida em partes
4. **Esquecer o método `down()`** - Sempre implemente a reversão

---

## 📋 Tipos de Colunas Comuns

```javascript
// Números
table.increments('id')                    // Auto-incremento
table.integer('count')                    // Inteiro
table.bigInteger('big_count')             // BigInt
table.decimal('price', 8, 2)              // Decimal (8 dígitos, 2 casas)
table.float('rating')                     // Float

// Strings
table.string('name', 100)                 // VARCHAR(100)
table.text('description')                 // TEXT
table.text('content', 'longtext')         // LONGTEXT

// Booleanos
table.boolean('is_active')                // Boolean

// Datas
table.date('birth_date')                  // Data
table.time('start_time')                  // Hora
table.datetime('created_at')              // Data e hora
table.timestamp('updated_at')             // Timestamp
table.timestamps(true, true)              // created_at + updated_at

// JSON
table.json('metadata')                    // JSON
table.jsonb('settings')                   // JSONB (PostgreSQL)

// Outros
table.uuid('uuid')                        // UUID
table.enum('status', ['active', 'inactive']) // ENUM
```

---

## 🔍 Verificar Status

Para ver quais migrations foram executadas:

```bash
npx knex migrate:status
```

---

## 🆘 Problemas Comuns

### Migration não executa

- Verifique se o arquivo `.env` está configurado corretamente
- Confirme que o banco de dados existe
- Execute `npm run migrate:latest` novamente

### Erro de sintaxe

- Certifique-se de usar `export async function` em vez de `exports`
- Verifique se está usando ES Modules (`"type": "module"` no package.json)

### Reverter migration específica

```bash
# Reverter até uma migration específica
npx knex migrate:rollback --to=20251226123510_create_posts_table.js
```

---

## 📚 Recursos Adicionais

- [Documentação Oficial do Knex.js](http://knexjs.org/)
- [Schema Builder - Knex](http://knexjs.org/guide/schema-builder.html)
- [Migrations Guide - Knex](http://knexjs.org/guide/migrations.html)

---

**Última atualização:** Dezembro 2025

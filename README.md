# Curriq API (GraphQL)

API GraphQL para geração de currículos personalizados baseada em perfis e vagas.

## Primeiros passos

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Copie o arquivo `.env.example` para `.env` e ajuste as variáveis.
3. Inicie o servidor em modo desenvolvimento:
   ```bash
   npm run dev
   ```

Acesse o playground em: [http://localhost:4000/graphql](http://localhost:4000/graphql)

## Stack
- Node.js
- Express
- Apollo Server (GraphQL)
- SQLite (SQL puro, sem ORM)

## Estrutura Modular
- `/schemas` — tipos e inputs GraphQL dos domínios principais:
  - `Profile`, `Experience`, `Education`, `Vacancy`, `Resume`, `Application`
- Cada domínio possui seu próprio arquivo de schema, facilitando manutenção e expansão.

## Scripts úteis
- `npm start` — inicia o servidor
- `npx run dev` — hot reload
- `npx eslint .` — lint

---

> Projeto em desenvolvimento. Veja o roadmap e contribua!
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
   npx nodemon index.js
   ```

Acesse o playground em: [http://localhost:4000/graphql](http://localhost:4000/graphql)

## Stack
- Node.js
- Express
- Apollo Server (GraphQL)
- SQLite (SQL puro, sem ORM)

## Scripts úteis
- `npm start` — inicia o servidor
- `node --wtach index.js` — hot reload
- `npx eslint .` — lint

---

> Projeto em desenvolvimento. Veja o roadmap e contribua!
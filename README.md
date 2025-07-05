# Curriq API (GraphQL)

API GraphQL para geração de currículos personalizados baseada em perfis e vagas.

## Primeiros passos

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Copie o arquivo `.env.example` para `.env` e ajuste as variáveis.
3. Rode o seed para criar um perfil de exemplo:
   ```bash
   node seed.js
   ```
4. Inicie o servidor em modo desenvolvimento:
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
- `/src/schemas` — tipos e inputs GraphQL dos domínios principais
- `/src/resolvers` — resolvers modulares para queries e mutations de cada domínio
- `/src/services` — serviços de acesso a dados e regras de negócio
- `/src/dtos` — DTOs (Data Transfer Objects) para validação e padronização de dados entre camadas
- Cada domínio possui seu próprio arquivo de schema, resolver, service e DTO, facilitando manutenção e expansão.

## Camada DTO (Data Transfer Object)
- Todos os dados de entrada e saída dos resolvers passam por DTOs, que centralizam validação, transformação e padronização.
- Exemplo: `ProfileDTO`, `ExperienceDTO`, `EducationDTO`, `VacancyDTO`, `ResumeDTO`, `ApplicationDTO`.
- Isso garante contratos claros, facilita testes e desacopla regras de validação do restante da lógica.

## Scripts úteis
- `npm start` — inicia o servidor
- `npm run dev` — hot reload
- `npx eslint .` — lint
- `node seed.js` — popula o banco com dados de exemplo

## Geração Inteligente de Currículo

A mutation `generateResume` faz análise semântica da vaga, cruza palavras-chave com o perfil e prioriza experiências/habilidades relevantes. O currículo é gerado em HTML e salvo no banco.

### Exemplo:

```graphql
mutation {
  generateResume(input: {
    profileId: 1
    vacancyId: 1
    template: "default"
  }) {
    id
    contentHtml
    createdAt
  }
}
```

---

> Projeto em desenvolvimento. Veja o roadmap e contribua!
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
- `/schemas` — tipos e inputs GraphQL dos domínios principais:
  - `Profile`, `Experience`, `Education`, `Vacancy`, `Resume`, `Application`
- `/resolvers` — resolvers modulares para queries e mutations de cada domínio
- `/services` — serviços de acesso a dados e regras de negócio (ex: ProfileService, ExperienceService, EducationService, VacancyService, ApplicationService, ResumeService)
- Cada domínio possui seu próprio arquivo de schema, resolver e service, facilitando manutenção e expansão.

## Scripts úteis
- `npm start` — inicia o servidor
- `npm run dev` — hot reload
- `npx eslint .` — lint
- `node seed.js` — popula o banco com dados de exemplo

## Exemplo de uso: Experience

```graphql
mutation {
  addExperience(profileId: 1, input: {
    title: "Desenvolvedor Backend"
    company: "Empresa X"
    startDate: "2022-01-01"
    endDate: "2023-01-01"
    description: "Atuação em projetos Node.js e GraphQL"
  }) {
    id
    title
    company
  }
}
```

## Exemplo de uso: Education

```graphql
mutation {
  addEducation(profileId: 1, input: {
    institution: "Universidade Y"
    degree: "Bacharelado"
    field: "Ciência da Computação"
    startDate: "2018-01-01"
    endDate: "2022-01-01"
    description: "Formação superior completa"
  }) {
    id
    institution
    degree
  }
}
```

## Exemplo de uso: Vacancy

```graphql
mutation {
  createVacancy(input: {
    title: "Desenvolvedor Fullstack"
    description: "Vaga para atuar com Node.js e React."
    requirements: ["Node.js", "React", "GraphQL"]
  }) {
    id
    title
    requirements
    createdAt
  }
}
```

## Exemplo de uso: Application

```graphql
mutation {
  createApplication(resumeId: 1, vacancyId: 1) {
    id
    status
    createdAt
  }
  updateApplicationStatus(id: 1, status: "accepted") {
    id
    status
    updatedAt
  }
}
```

## Exemplo de uso: Resume

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
const { gql } = require('apollo-server-express');

module.exports = gql`
  type Vacancy {
    id: ID!
    title: String!
    description: String!
    requirements: [String!]!
    createdAt: String!
  }

  input VacancyInput {
    title: String!
    description: String!
    requirements: [String!]!
  }
`;

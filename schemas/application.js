const { gql } = require('apollo-server-express');

module.exports = gql`
  type Application {
    id: ID!
    resume: Resume!
    vacancy: Vacancy!
    status: String!
    createdAt: String!
    updatedAt: String!
  }
`;

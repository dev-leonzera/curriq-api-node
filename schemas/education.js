const { gql } = require('apollo-server-express');

module.exports = gql`
  type Education {
    id: ID!
    profileId: ID!
    institution: String!
    degree: String!
    field: String
    startDate: String!
    endDate: String
    description: String
  }

  input EducationInput {
    institution: String!
    degree: String!
    field: String
    startDate: String!
    endDate: String
    description: String
  }
`;

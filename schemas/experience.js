const { gql } = require('apollo-server-express');

module.exports = gql`
  type Experience {
    id: ID!
    profileId: ID!
    title: String!
    company: String!
    startDate: String!
    endDate: String
    description: String
  }

  input ExperienceInput {
    title: String!
    company: String!
    startDate: String!
    endDate: String
    description: String
  }
`;

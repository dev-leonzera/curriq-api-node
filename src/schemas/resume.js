const { gql } = require('apollo-server-express');

module.exports = gql`
  type Resume {
    id: ID!
    profile: Profile!
    vacancy: Vacancy
    contentHtml: String!
    downloadUrl: String
    createdAt: String!
  }

  input GenerateResumeInput {
    profileId: ID!
    vacancyId: ID
    template: String
  }
`;

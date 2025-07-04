const { gql } = require('apollo-server-express');

module.exports = gql`
  type Profile {
    id: ID!
    fullName: String!
    email: String!
    bio: String
    skills: [String!]!
    experiences: [Experience]
    education: [Education]
  }

  input CreateProfileInput {
    fullName: String!
    email: String!
    bio: String
    skills: [String!]!
  }
`;

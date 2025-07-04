const { gql } = require('apollo-server-express');
const profile = require('./profile');
const experience = require('./experience');
const education = require('./education');
const vacancy = require('./vacancy');
const resume = require('./resume');
const application = require('./application');

const base = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

module.exports = [
  base,
  profile,
  experience,
  education,
  vacancy,
  resume,
  application
];

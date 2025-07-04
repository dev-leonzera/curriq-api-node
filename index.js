require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const app = express();


// Schemas e resolvers modulares
const typeDefs = require('./src/schemas');
const resolversArray = require('./src/resolvers');
const { mergeResolvers } = require('@graphql-tools/merge');
const resolvers = mergeResolvers(resolversArray);

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer();

require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const app = express();


// Schemas e resolvers modulares
const typeDefs = require('./schemas');
const resolvers = {}; // Resolvers serão implementados nas próximas etapas

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

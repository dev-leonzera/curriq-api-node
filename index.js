require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const app = express();

// Placeholder para schemas e resolvers
const typeDefs = `type Query { _: Boolean }`;
const resolvers = { Query: { _: () => true } };

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

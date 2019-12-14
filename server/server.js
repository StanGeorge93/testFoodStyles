import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import db from "./models";

const server = new ApolloServer({
  cors: {
    origin: '*'
  },
  typeDefs: gql(typeDefs),
  resolvers,
  context: {
    db
  }
});

const app = express();
server.applyMiddleware({ app });

db.sequelize.sync({ force: true }).then(() => {

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
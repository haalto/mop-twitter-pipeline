import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import UserResolver from "./resolvers/UserResolver";

export const createServer = async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
  });
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });
  await server.start();
  server.applyMiddleware({ app });
  return app;
};

import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import UserResolver from "./resolvers/UserResolver";
import TweetResolver from "./resolvers/TweetResolver";

export const createServer = async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver, TweetResolver],
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

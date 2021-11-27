import * as dotenv from "dotenv";
import { PostRulesRequestPayload } from "./types";
dotenv.config({ path: `${__dirname}/../.env` });

export const rules: PostRulesRequestPayload = {
  add: [
    {
      value: "dog has:images -is:retweet",
      tag: "dog pictures",
    },
    {
      value: "cat has:images -grumpy",
      tag: "cat pictures",
    },
  ],
};

export const params = {
  expansions: "author_id",
};

const streamURL = `https://api.twitter.com/2/tweets/search/stream?expansions=${params.expansions}`;

export const config = {
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  bearerToken: process.env.BEARER_TOKEN,
  rulesURL: "https://api.twitter.com/2/tweets/search/stream/rules",
  streamURL,
  listsURL: "https://api.twitter.com/2/lists",
  listOfMOP: 203337069,
};

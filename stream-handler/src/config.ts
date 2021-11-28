import * as dotenv from "dotenv";
import { stringify } from "querystring";
dotenv.config({ path: `${__dirname}/../.env` });

export const params = {
  expansions: "author_id",
  "tweet.fields": "created_at,entities,context_annotations",
};

const streamURL = `https://api.twitter.com/2/tweets/search/stream?${stringify(
  params
)}`;

export const config = {
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  bearerToken: process.env.BEARER_TOKEN,
  rulesURL: "https://api.twitter.com/2/tweets/search/stream/rules",
  streamURL,
  listsURL: "https://api.twitter.com/2/lists",
  listOfMOP: 203337069,
};

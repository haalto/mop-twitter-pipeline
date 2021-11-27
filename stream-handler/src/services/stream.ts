import { get } from "needle";
import { config } from "../config";
import { isJsonString } from "../helpers";

const { streamURL, bearerToken } = config;

export const streamConnect = async (retryAttempt: number) => {
  const stream = get(streamURL, {
    headers: {
      "User-Agent": "parlament-stream",
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  stream.on("data", (json) => {
    try {
      if (isJsonString(json)) {
        const data = JSON.parse(json);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  });
  stream.on("err", (error) => {
    if (error.code !== "ECONNRESET") {
      console.log(error.code);
      process.exit(1);
    }
    setTimeout(() => {
      console.warn("A connection error occurred. Reconnecting...");
      streamConnect(++retryAttempt);
    }, 2 ** retryAttempt);
  });
  return stream;
};

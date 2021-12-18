import { get } from "needle";
import { config } from "../config";
import { isJSONString } from "../helpers";
import { sendToQueue } from "./mq";

const { streamURL, bearerToken } = config;

export const streamConnect = (retryAttempt: number) => {
  const stream = get(streamURL, {
    headers: {
      "User-Agent": "parlament-stream",
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  stream.on("data", async (json) => {
    try {
      if (isJSONString(json)) {
        await sendToQueue(Buffer.from(json));
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
};

import { get } from "needle";
import { config } from "../config";
import { isJSONString } from "../helpers";
import { getChannel, getQueue } from "./mq";

const { streamURL, bearerToken } = config;

export const streamConnect = async (retryAttempt: number) => {
  const channel = await getChannel();
  const queue = await getQueue();

  const stream = get(streamURL, {
    headers: {
      "User-Agent": "parlament-stream",
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  stream.on("data", (json) => {
    try {
      if (isJSONString(json)) {
        channel.sendToQueue(queue.queue, Buffer.from(json));
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

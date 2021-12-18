import { getChannel, getQueue } from "./services/mq";
import { createTweet } from "./services/tweets";
import { StreamObject } from "./types";

(async () => {
  const channel = await getChannel();
  const queue = await getQueue();

  channel.prefetch(1);
  channel.consume(
    queue.queue,
    async (msg) => {
      if (msg) {
        try {
          const parsedMessage = JSON.parse(
            msg.content.toString()
          ) as StreamObject;

          await createTweet(parsedMessage);
          console.log("Done");
          channel.ack(msg);
        } catch (err) {
          console.error(err);
        }
      }
    },
    {
      noAck: false,
    }
  );
})();

import { getChannel, getQueue } from "./services/mq";

(async () => {
  const channel = await getChannel();
  const queue = await getQueue();

  channel.prefetch(1);
  console.log(
    " [*] Waiting for messages in %s. To exit press CTRL+C",
    queue.queue
  );
  channel.consume(
    queue.queue,
    (msg) => {
      if (msg) {
        console.log("[x] Received: ", JSON.parse(msg.content.toString()));
        setTimeout(function () {
          console.log(" [x] Done");
          channel.ack(msg);
        }, 3000);
      }
    },
    {
      noAck: false,
    }
  );
})();

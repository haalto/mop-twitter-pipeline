import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../.env` });

export const config = {
  queueName: process.env.MQ_NAME || "tweets",
  mqUrl: process.env.MQ_URL || "amqp://mq:5672",
};

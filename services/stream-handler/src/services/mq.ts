import { connect } from "amqplib";
import { config } from "../config";

const { mqUrl, queueName } = config;

const getConnection = () => {
  return connect(mqUrl);
};

const getChannel = async () => {
  const connection = await getConnection();
  return connection.createChannel();
};

const getQueue = async () => {
  const channel = await getChannel();
  const queue = channel.assertQueue(queueName);
  return queue;
};

export const sendToQueue = async (message: Buffer) => {
  const channel = await getChannel();
  const queue = await getQueue();
  channel.sendToQueue(queue.queue, message);
};

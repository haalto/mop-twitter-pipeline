import { connect } from "amqplib";
import { config } from "../config";

const { mqUrl, queueName } = config;

const getConnection = () => {
  return connect(mqUrl);
};

export const getChannel = async () => {
  const connection = await getConnection();
  return connection.createChannel();
};

export const getQueue = async () => {
  const channel = await getChannel();
  const queue = channel.assertQueue(queueName);
  return queue;
};

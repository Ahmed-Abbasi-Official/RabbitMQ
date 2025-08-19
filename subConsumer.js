/* This JavaScript code snippet is setting up a function `reciveEmail` that connects to a local AMQP
server (RabbitMQ in this case), creates a channel, asserts a queue named "mail_key_subscribed_user"
with the option `{ durable: false }`, and then starts consuming messages from that queue. */
const amqp = require("amqplib");

const reciveEmail = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("mail_key_subscribed_user", { durable: false });

    channel.consume("mail_key_subscribed_user", (message) => {
      if (message !== null) {
        console.log("Recived Message at Sub Queue : ", JSON.parse(message.content));
        channel.ack(message);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

reciveEmail();
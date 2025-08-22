const amqp = require("amqplib");

const reciveEmail = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("mail_key_nor_user", { durable: false });

    channel.consume("mail_key_nor_user", (message) => {
      if (message !== null) {
        console.log("Recived Message at Normal Queue : ", JSON.parse(message.content));
        channel.ack(message);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

reciveEmail();
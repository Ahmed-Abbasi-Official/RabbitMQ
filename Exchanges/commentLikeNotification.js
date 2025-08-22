const amqp = require("amqplib");

const reciveEmail = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const exchange = "header_exchange";
    const exchangeType = "headers";

    await channel.assertExchange(exchange, exchangeType, { durable: true });

    const q = await channel.assertQueue("", { exclusive: true });
    console.log("Waiting for new video Notifications...");

    await channel.bindQueue(q.queue, exchange, "", {
      "x-match": "any",
      "notification-type": "comment",
      "notification-type": "like",
    });

    channel.consume(q.queue, (message) => {
      if (message !== null) {
        console.log(
          "Recived any Matching Notification : ",
          JSON.parse(message)
        );
        channel.ack(message);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

reciveEmail();

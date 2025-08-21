const amqp = require("amqplib");

const reciveEmail = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const exchange = "notification_exchange";
    const queue = "order_queue";

    await channel.assertExchange(exchange,"topic",{durable:true});
    await channel.assertQueue(queue, { durable: true });

    await channel.bindQueue(queue,exchange,"order.*");

    channel.consume(queue, (message) => {
      if (message !== null) {
        console.log("Order Notification was sent : ", JSON.parse(message.content));
        channel.ack(message);
      }
    },{noAck:false});
  } catch (error) {
    console.log(error);
  }
};

reciveEmail();
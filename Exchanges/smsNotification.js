const amqp = require("amqplib");

const reciveEmail = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const exchange = "new_product_launch";
    const exchangeType = "fanout";

    await channel.assertExchange(exchange,exchangeType,{durable:true});

    const q = await channel.assertQueue("",{exclusive:true});
    console.log("Waiting for Messages : => ",q);

    await channel.bindQueue(q.queue,exchange,"");


    channel.consume(q.queue, (message) => {
      if (message !== null) {
        console.log("Sms Notification For Product : ", JSON.parse(message.content));
        channel.ack(message);
      }
    },{noAck:false});
  } catch (error) {
    console.log(error);
  }
};

reciveEmail();
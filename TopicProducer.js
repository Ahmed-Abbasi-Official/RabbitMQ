const amqp = require("amqplib");

const producer = async (routingKey,message) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchange = "notification_exchange";
    const exchangeType = "topic";

    await channel.assertExchange(exchange, exchangeType, { durable: true });

    //* NO NEED OF QUEUE AND BIND QUEUE IT HANDLE FROM CONSUMER SIDES :

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)),{presistent:true});
    console.log("[x] sent '%s' : '%s'", routingKey, JSON.stringify(message));
    console.log("Msg was sent with routing key as : ", routingKey);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.log(error);
  }
};

producer("order.placed",{orderId:12345,status:"placed"});
producer("payment.processed",{paymentId:12345,status:"processed"});

const amqp = require("amqplib");

const producer = async (message) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchange = "new_product_launch";
    const exchangeType = "fanout";

    await channel.assertExchange(exchange, exchangeType, { durable: true });

    //* NO NEED OF QUEUE AND BIND QUEUE IT HANDLE FROM CONSUMER SIDES :

    channel.publish(exchange,"", Buffer.from(JSON.stringify(message)),{presistent:true});
    console.log("[x] sent '%s' : '%s'", JSON.stringify(message));

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.log(error);
  }
};

producer({orderId:12345,status:"placed"});

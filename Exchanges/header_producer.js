const amqp = require("amqplib");

const producer = async (headers,message) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
  
    const exchange = "header_exchange";
    const exchangeType = "headers";

    await channel.assertExchange(exchange, exchangeType , { durable: true });
  
    channel.publish(exchange,"",Buffer.from(JSON.stringify(message)),{
        persistent:true,
        headers
    });

    console.log("Notification sent with Headers...")
  
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.log(error)
  }
};

producer({"x-match":"all","notification-type":"new_video","content-type":"video"},"New Music video is uploaded");
producer({"x-match":"all","notification-type":"live_stream","content-type":"gaming"},"Gaming Live Stream is started");
producer({"x-match":"any","notification-type":"comment","content-type":"vlog"},"New Commnet on your Vlog");
producer({"x-match":"any","notification-type":"like","content-type":"vlog"},"Someone liked your commment");

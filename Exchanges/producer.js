/* This JavaScript code snippet is setting up a connection to an AMQP (Advanced Message Queuing
Protocol) server using the `amqplib` library. It then defines two functions: `sendMail` and
`producer`. */
const amqp = require("amqplib");

// const sendMail =  async() => {
//     try {
//         const connection = await amqp.connect("amqp://localhost");
//         const channel = await connection.createChannel();
//         const exchange = "mail_exchange";
//         const routingKey = "send_mail";

//         const message =
//         {
//             to:"farhadkhi17@gmail.com",
//             from:"aymi.coding@gmail.com",
//             subject:"kese hu",
//             body:"heelo !!"
//         }

//         await channel.assertExchange(exchange,"direct",{durable:false})
//         await channel.assertQueue("mail_queue",{durable:false})
//         await channel.bindQueue("mail_queue",exchange,routingKey);

//         channel.publish(exchange,routingKey,Buffer.from(JSON.stringify(message)));

//         console.log("Mail data was sent : ",message);

//         setTimeout(() => {
//             connection.close();
//         }, 500);

//     } catch (error) {
//         console.log(error)
//     }
// }

// sendMail();

//* SECONG FOR TWO QUEUES

const producer = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
  
    const exchange = "producer_exchange";
    const routingKey_sub_user = "mail_key_subscribed_user";
    const routingKey_nor_user = "mail_key_nor_user";
  
    const message = {
      to: "farhadkhi17@gmail.com",
      from: "aymi.coding@gmail.com",
      subject: "kese hu",
      body: "heelo !!",
    };
  
    await channel.assertExchange(exchange, "direct", { durable: false });
    await channel.assertQueue("mail_key_subscribed_user", { durable: false });
    await channel.assertQueue("mail_key_nor_user", { durable: false });
  
    channel.bindQueue("mail_key_subscribed_user",exchange,routingKey_sub_user);
    channel.bindQueue("mail_key_nor_user",exchange,routingKey_nor_user);
    channel.publish(exchange,routingKey_nor_user,Buffer.from(JSON.stringify(message)));
  
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.log(error)
  }
};

producer();

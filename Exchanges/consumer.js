const amqp = require("amqplib");

// const reciveEmail = async () => {
//   try {
//     const connection = await amqp.connect("amqp://localhost");
//     const channel = await connection.createChannel();
//     await channel.assertQueue("mail_queue", { durable: false });

//     channel.consume("mail_queue", (message) => {
//       if (message !== null) {
//         console.log("Recived Message : ", JSON.parse(message.content));
//         channel.ack(message);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// reciveEmail();



//* SECONG FOR TWO QUEUES




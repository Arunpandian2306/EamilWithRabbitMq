const amqp = require('amqplib');

async function sendToQueue(emailData) {
  try {
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();
    const queue = 'emailQueue';

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(emailData)));

    console.log(`Message sent to queue: ${JSON.stringify(emailData)}`);
    setTimeout(() => {
      connection.close();
    }, 1000);
  } catch (error) {
    console.error('Error sending message to queue:', error);
  }
}

module.exports = { sendToQueue };

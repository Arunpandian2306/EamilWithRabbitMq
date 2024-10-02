
const amqp = require('amqplib');
const { sendEmail } = require('../services/emailService');

async function consumeQueue() {
  try {
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();
    const queue = 'emailQueue';

    await channel.assertQueue(queue, { durable: true });
    console.log('Waiting for messages in queue:', queue);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const emailData = JSON.parse(msg.content.toString());
        await sendEmail(emailData);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error consuming message from queue:', error);
  }
}

consumeQueue();
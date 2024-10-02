const express = require('express');
const router = express.Router();
const { sendToQueue } = require('../rabbitmq/producer');

/* POST email send request */
router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).send('Missing email parameters');
  }

  const emailData = { to, subject, text };
  await sendToQueue(emailData);
  res.status(200).send('Email request sent to RabbitMQ');
});

module.exports = router;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

async function sendEmail(emailData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailData.to,
    subject: emailData.subject,
    text: emailData.text
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };

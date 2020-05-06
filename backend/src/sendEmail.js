const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const mailTemplate = token => `
  <div>
    <h2>Reset Token</h2>
    <p>To reset your password, please click the link below</p>
    <a href="${process.env.FRONTEND_URL}/passwordReset?resetToken=${token}">Click here</<>
  </div>
`

exports.transport = transport;
exports.mailTemplate = mailTemplate;
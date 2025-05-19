const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your.email@gmail.com",
    pass: "your-app-password", // Use app password if 2FA enabled
  },
});

async function sendEmail({ to, subject, text }) {
  const mailOptions = {
    from: '"Your App" <your.email@gmail.com>',
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;

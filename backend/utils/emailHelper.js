const nodemailer = require('nodemailer');
const { useEmail, smtpHost, smtpPort, smtpUser, smtpPass, senderEmail } = require('../config/env');

exports.sendEmail = async (to, subject, html, instituteId = null) => {
  if (!useEmail) return console.log('Email feature disabled via env');

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for 587
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: senderEmail,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    // Record usage (plug-and-play for later)
    if (instituteId) {
      console.log(`[Email Sent] Tracked for ${instituteId}`);
      // await trackMessageUsage(instituteId, 'Email');
    }

    return info;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
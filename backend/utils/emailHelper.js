// backend/utils/emailHelper.js
const nodemailer = require('nodemailer');
const env = require('../config/env');

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS
  }
});

exports.sendEmail = async (to, subject, text) => {
  console.log(`[EmailHelper] Sending email to ${to}: ${subject}`);
  return true;
};

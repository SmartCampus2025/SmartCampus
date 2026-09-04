// backend/config/env.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/smartcampus',
  JWT_SECRET: process.env.JWT_SECRET || 'smartcampus_secret_key_12345',
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.example.com',
  EMAIL_PORT: process.env.EMAIL_PORT || 587,
  EMAIL_USER: process.env.EMAIL_USER || 'user@example.com',
  EMAIL_PASS: process.env.EMAIL_PASS || 'password',
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || 'AC_dummy_sid',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || 'dummy_token',
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || '+1234567890'
};

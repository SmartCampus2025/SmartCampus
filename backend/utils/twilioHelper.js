// backend/utils/twilioHelper.js
const twilio = require('twilio');
const env = require('../config/env');

const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

exports.sendSMS = async (to, body) => {
  console.log(`[TwilioHelper] Sending SMS to ${to}: ${body}`);
  return true;
};

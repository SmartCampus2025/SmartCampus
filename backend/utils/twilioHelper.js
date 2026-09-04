const twilio = require('twilio');
const { accountSid, authToken, twilioNumber, useSMS, serviceChargePerMessage } = require('../config/env');
const client = new twilio(accountSid, authToken);

exports.sendSMS = async (to, body, instituteId = null) => {
  if (!useSMS) return console.log('SMS disabled via env');
  
  try {
    const fullBody = `${body}\n\n[Powered by SmartCampus]`;
    const message = await client.messages.create({ body: fullBody, to, from: twilioNumber });

    // Record usage + apply service charge
    if (instituteId) {
      await trackMessageUsage(instituteId, 'SMS');
    }

    return message.sid;
  } catch (err) {
    console.error('SMS error:', err);
  }
};
// Simulation of SMS/Email/WhatsApp alerts
const sendSMS = (number, message) => {
  console.log(`📱 SMS sent to ${number}: ${message}`);
};

const sendEmail = (email, message) => {
  console.log(`📧 Email sent to ${email}: ${message}`);
};

const sendWhatsApp = (number, message) => {
  console.log(`💬 WhatsApp sent to ${number}: ${message}`);
};

module.exports = {
  sendSMS,
  sendEmail,
  sendWhatsApp
};
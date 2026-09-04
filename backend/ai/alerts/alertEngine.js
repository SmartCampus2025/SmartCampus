// backend/ai/alerts/alertEngine.js
const alertService = require('./alertService');

async function triggerAlert(type, message, recipient) {
  console.log(`[AlertEngine] Triggering ${type} alert: ${message}`);
  if (recipient) {
    await alertService.sendEmail(recipient, `SmartCampus Alert: ${type}`, message);
  }
  return { status: 'Alert Sent', type, message };
}

module.exports = {
  triggerAlert
};

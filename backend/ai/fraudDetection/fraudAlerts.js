// backend/ai/fraudDetection/fraudAlerts.js
async function sendFraudAlert(anomaly, type) {
  console.log(`🚨 Fraud Alert Detected in ${type ? type.toUpperCase() : 'UNKNOWN'}!`);
  console.log(`Details:`, anomaly);
  return { success: true };
}

module.exports = {
  sendFraudAlert
};

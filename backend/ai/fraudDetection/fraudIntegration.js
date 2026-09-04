// backend/ai/fraudDetection/fraudIntegration.js
const { analyzeFraud } = require('./fraudAnalyzer');
const { sendFraudAlert } = require('./fraudAlerts');

async function monitorFraud(data, type) {
  const results = analyzeFraud(data, type);

  for (const anomaly of results) {
    if (anomaly.severity === 'High') {
      await sendFraudAlert(anomaly, type);
    }
  }
  return results;
}

module.exports = {
  monitorFraud
};

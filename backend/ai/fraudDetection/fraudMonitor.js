// backend/ai/fraudDetection/fraudMonitor.js
const { detectFraud } = require('./fraudDetection');
const alertManager = require('../alerts/alertManager');

async function monitorFraud(financialData = [], attendanceData = []) {
  const financialAnomalies = [];
  for (const item of financialData) {
    const res = await detectFraud('finance', item);
    if (res.suspicious) financialAnomalies.push({ ...item, ...res });
  }

  if (financialAnomalies.length > 0) {
    await alertManager.sendAlert('FRAUD_DETECTED', { count: financialAnomalies.length });
  }

  return { financialAnomalies };
}

module.exports = {
  monitorFraud
};

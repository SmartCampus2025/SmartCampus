// backend/ai/fraudDetection/fraudAnalyzer.js
const { detectAnomalies } = require('./anomalyDetection');

function analyzeFraud(data, type) {
  const anomalies = detectAnomalies(Array.isArray(data) ? data : [data], type);

  return anomalies.map((a) => ({
    ...a,
    severity: (a.reason && a.reason.includes('amount')) ? 'High' : 'Medium',
    timestamp: new Date()
  }));
}

module.exports = {
  analyzeFraud
};

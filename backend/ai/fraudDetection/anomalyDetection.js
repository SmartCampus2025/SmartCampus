// backend/ai/fraudDetection/anomalyDetection.js
function detectAnomalies(records = [], type = 'financial') {
  const anomalies = [];

  const arr = Array.isArray(records) ? records : [records];
  arr.forEach(record => {
    if (type === 'financial' || type === 'finance') {
      if (record.amount > 50000 || record.amount < 0) {
        anomalies.push({ record, reason: 'Suspicious amount' });
      }
    } else if (type === 'attendance') {
      if (record.consecutiveAbsences > 5) {
        anomalies.push({ record, reason: 'Consecutive absences exceeds threshold' });
      }
    }
  });

  return anomalies;
}

function detectFraud(records = [], type = 'financial') {
  return detectAnomalies(records, type);
}

module.exports = {
  detectAnomalies,
  detectFraud
};

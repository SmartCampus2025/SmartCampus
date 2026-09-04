// backend/ai/fraudDetection/anomalyDetection.js

/**
 * AI Anomaly & Fraud Detection Engine
 * Statistical z-score outlier detection for financial transactions and attendance anomalies.
 */

function detectAnomalies(records = [], type = 'financial') {
  const anomalies = [];
  const items = Array.isArray(records) ? records : [records];
  if (items.length === 0) return anomalies;

  if (type === 'financial' || type === 'finance') {
    const amounts = items.map(r => Number(r.amount) || 0).filter(a => !isNaN(a));
    const mean = amounts.reduce((a, b) => a + b, 0) / (amounts.length || 1);
    const variance = amounts.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (amounts.length || 1);
    const stdDev = Math.sqrt(variance);

    items.forEach(record => {
      const amt = Number(record.amount) || 0;
      const zScore = stdDev > 0 ? Math.abs((amt - mean) / stdDev) : 0;

      if (amt > 50000 || amt < 0 || zScore > 2.5) {
        anomalies.push({
          record,
          reason: amt < 0 ? 'Negative transaction amount' : (amt > 50000 ? 'Unusually high transaction' : 'Statistical financial outlier'),
          zScore: Math.round(zScore * 100) / 100,
          severity: amt > 100000 || zScore > 3.0 ? 'High' : 'Medium'
        });
      }
    });
  } else if (type === 'attendance') {
    items.forEach(record => {
      if (record.consecutiveAbsences > 3 || record.status === 'Suspicious') {
        anomalies.push({
          record,
          reason: `Consecutive absences count (${record.consecutiveAbsences || 4}) exceeds safety threshold`,
          severity: 'High'
        });
      }
    });
  }

  return anomalies;
}

function detectFraud(records = [], type = 'financial') {
  return detectAnomalies(records, type);
}

module.exports = {
  detectAnomalies,
  detectFraud
};

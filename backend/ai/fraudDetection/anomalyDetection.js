// backend/ai/fraudDetection/fraudDetection.js

/**
 * AI Fraud Detection
 * Detects unusual activity in financial and attendance data.
 */

export function detectFraud(records, type = "financial") {
  const anomalies = [];

  records.forEach(record => {
    // Example: flag large or suspicious financial transactions
    if (type === "financial" && record.amount > 1000000) {
      anomalies.push({
        record,
        reason: "Unusually large financial transaction detected"
      });
    }

    // Example: flag fake attendance spikes
    if (type === "attendance" && record.attendanceMarked > record.totalStudents) {
      anomalies.push({
        record,
        reason: "Impossible attendance data detected"
      });
    }
  });

  return anomalies;
}

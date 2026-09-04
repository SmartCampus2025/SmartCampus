// ai/fraudDetection/fraudIntegration.js
import { analyzeFraud } from "./fraudAnalyzer.js";
import { sendFraudAlert } from "./fraudAlerts.js";

export async function monitorFraud(data, type) {
  const results = analyzeFraud(data, type);

  for (const anomaly of results) {
    if (anomaly.severity === "High") {
      await sendFraudAlert(anomaly, type);
    }
  }

  return results;
}

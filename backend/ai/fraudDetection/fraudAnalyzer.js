// ai/fraudDetection/fraudAnalyzer.js
import { detectAnomalies } from "./anomalyDetection.js";

export function analyzeFraud(data, type) {
  const anomalies = detectAnomalies(data, type);

  return anomalies.map((a) => ({
    ...a,
    severity: a.reason.includes("amount") ? "High" : "Medium",
    timestamp: new Date(),
  }));
}

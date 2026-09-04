// backend/ai/fraudDetection/fraudMonitor.js

import { detectFraud } from "./fraudDetection.js";
import { sendAlert } from "../intelligentAlerts/alertManager.js";

export async function monitorFraud(financialData, attendanceData) {
  const financialAnomalies = detectFraud(financialData, "financial");
  const attendanceAnomalies = detectFraud(attendanceData, "attendance");

  const allAnomalies = [...financialAnomalies, ...attendanceAnomalies];

  if (allAnomalies.length > 0) {
    console.log("🚨 Fraud/Anomalies detected:", allAnomalies);

    // Send alerts to admin/principal
    for (const anomaly of allAnomalies) {
      await sendAlert({
        type: "fraud",
        message: `Fraud Detected: ${anomaly.reason}`,
        data: anomaly.record
      });
    }
  } else {
    console.log("✅ No fraud detected in this cycle.");
  }
}

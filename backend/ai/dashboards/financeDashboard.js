// backend/ai/dashboards/financeDashboard.js
import { runFraudCheck } from "../fraudDetection/fraudDetection.js";
import { applyMadrassaSupport } from "../madrassa/madrassaSupport.js";
import { sendAlert } from "../alerts/alertManager.js";

export async function updateFinance(transactionData) {
  try {
    console.log("Processing finance transaction...");

    // Apply madrassa-specific support (Hijri calendar for receipts, Arabic labels)
    const madrassaData = applyMadrassaSupport("finance", transactionData);

    // Run fraud detection on financial transactions
    const fraudResults = await runFraudCheck("finance", madrassaData);

    if (fraudResults.flagged) {
      console.warn("⚠️ Potential Fraud in Finance:", fraudResults.details);

      // Trigger AI alerts for suspicious activity
      await sendAlert("fraud", {
        module: "finance",
        details: fraudResults.details,
      });
    }

    // Save transaction (replace with real DB logic later)
    console.log("✅ Transaction processed successfully.");
    return { success: true, fraudResults, madrassaData };

  } catch (error) {
    console.error("❌ Error updating finance:", error);

    // Trigger system alert for errors
    await sendAlert("system_error", {
      module: "finance",
      error: error.message,
    });

    return { success: false, error: error.message };
  }
}
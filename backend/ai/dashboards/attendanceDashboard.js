// backend/ai/dashboards/attendanceDashboard.js
import { runFraudCheck } from "../fraudDetection/fraudDetection.js";
import { applyMadrassaSupport } from "../madrassa/madrassaSupport.js";
import { sendAlert } from "../alerts/alertManager.js";

export async function updateAttendance(attendanceData) {
  try {
    console.log("Updating attendance...");

    // Apply madrassa-specific formatting (Arabic names, Islamic calendar dates)
    const madrassaData = applyMadrassaSupport("attendance", attendanceData);

    // Run fraud detection on attendance data
    const fraudResults = await runFraudCheck("attendance", madrassaData);

    if (fraudResults.flagged) {
      console.warn("⚠️ Potential Fraud in Attendance:", fraudResults.details);

      // Trigger AI alerts for flagged issues
      await sendAlert("fraud", {
        module: "attendance",
        details: fraudResults.details,
      });
    }

    // Save attendance (replace with real DB logic later)
    console.log("✅ Attendance updated successfully.");
    return { success: true, fraudResults, madrassaData };

  } catch (error) {
    console.error("❌ Error updating attendance:", error);

    // Trigger system alert for errors
    await sendAlert("system_error", {
      module: "attendance",
      error: error.message,
    });

    return { success: false, error: error.message };
  }
}
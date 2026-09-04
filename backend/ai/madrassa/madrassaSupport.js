import { applyArabicSupport } from "./arabicSupport.js";
import { getIslamicDate } from "./islamicCalendar.js";
import { sendAlert } from "../alerts/intelligentAlerts.js";

/**
 * Core Madrassa AI Support Module
 * Handles madrassa-specific records, reports, and Islamic integration.
 */
export async function madrassaSupportEngine(data, module) {
  const hijriDate = getIslamicDate();

  // Example: if attendance data is processed
  if (module === "attendance") {
    return {
      ...data,
      hijriDate,
      remarks: "Attendance synced with Islamic calendar",
    };
  }

  // Example: if finance data is processed
  if (module === "finance") {
    const zakatEligible = data.amount >= 5000; // just a sample rule
    if (zakatEligible) {
      sendAlert(
        "finance",
        `Transaction ${data.id} is zakat-eligible. Islamic guidance may be required.`
      );
    }
    return { ...data, hijriDate, zakatEligible };
  }

  // Example: if Hifz / Dars-e-Nizami records
  if (module === "hifz") {
    return {
      studentId: data.studentId,
      surah: data.surah,
      ayahRange: data.ayahRange,
      hijriDate,
      status: "Hifz Progress Recorded",
    };
  }

  return { ...data, hijriDate, remarks: "Madrassa data processed" };
}

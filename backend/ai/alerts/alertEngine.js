// ai/alerts/alertEngine.js
import { sendSMS, sendEmail, sendWhatsApp } from "./alertService.js";
import config from "./alertConfig.js";

export const processAlert = async (eventType, payload) => {
  let message = "";
  let subject = "";

  switch (eventType) {
    case "FEE_DUE":
      if (payload.daysLeft <= config.thresholds.feeDueDays) {
        subject = "Fee Due Reminder";
        message = `Dear ${payload.name}, your fee of ${payload.amount} is due in ${payload.daysLeft} days.`;
      }
      break;

    case "LOW_ATTENDANCE":
      if (payload.attendance < config.thresholds.lowAttendance) {
        subject = "Low Attendance Alert";
        message = `Dear ${payload.name}, your attendance is ${payload.attendance}%. Please improve.`;
      }
      break;

    case "DB_ERROR":
      if (config.thresholds.dbError) {
        subject = "System Error Alert";
        message = `Critical DB error detected: ${payload.error}`;
      }
      break;

    default:
      console.log(`Unhandled alert type: ${eventType}`);
  }

  if (message) {
    if (payload.phone) await sendSMS(payload.phone, message);
    if (payload.email) await sendEmail(payload.email, subject, message);
    if (payload.whatsapp) await sendWhatsApp(payload.whatsapp, message);
  }
};

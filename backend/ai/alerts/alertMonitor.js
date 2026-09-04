// ai/alerts/alertMonitor.js
import { processAlert } from "./alertEngine.js";

// Example: hook into event bus or message queue
export const simulateEvents = async () => {
  // Fee due simulation
  await processAlert("FEE_DUE", { name: "Ali", daysLeft: 2, amount: 5000, phone: "+923001234567", email: "ali@example.com" });

  // Low attendance simulation
  await processAlert("LOW_ATTENDANCE", { name: "Sara", attendance: 55, phone: "+923009876543", email: "sara@example.com" });

  // DB error simulation
  await processAlert("DB_ERROR", { error: "Connection timeout", email: "admin@school.com", whatsapp: "+923001112233" });
};

// Start monitor loop
simulateEvents();

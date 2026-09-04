// backend/ai/events/handlers.js
const { onEvent } = require('./eventBus');

// Connect to alert engine
let alertEngine = null;
try { alertEngine = require('../alerts/alertEngine'); } catch (e) { console.warn('alerts engine not found'); }

// Connect SelfHeal service for logging / auto-heal triggers
let selfHealService = null;
try { selfHealService = require('../services/selfHealService'); } catch (e) { /* optional */ }

// Example: when fee due detected, create alert
onEvent('FEE_DUE', async (payload) => {
  try {
    if (alertEngine && typeof alertEngine.sendAlert === 'function') {
      // alertEngine.sendAlert(type, recipient, data) or adapt to your API
      await alertEngine.sendAlert('feeReminder', { name: payload.name, phone: payload.phone, email: payload.email, amount: payload.amount, dueDate: payload.dueDate });
    } else {
      // fallback: import alertService directly
      const alertService = require('../alerts/alertService');
      await alertService.sendEmail(payload.email, 'Fee Due Reminder', `Dear ${payload.name}, your fee is due on ${payload.dueDate}`);
    }
  } catch (e) {
    console.error('handler FEE_DUE error', e.message);
  }
});

// Low attendance -> alerts
onEvent('LOW_ATTENDANCE', async (payload) => {
  try {
    if (alertEngine && alertEngine.sendAlert) {
      await alertEngine.sendAlert('studentPerformance', { name: payload.name, phone: payload.phone, email: payload.email, attendance: payload.attendance, subject: payload.subject, action: payload.action });
    }
  } catch (e) {
    console.error('handler LOW_ATTENDANCE error', e.message);
  }
});

// Self-heal event example (DB restored)
onEvent('DB_RESTORED', async (payload) => {
  try {
    // Log via selfHealService if available
    if (selfHealService && selfHealService.attemptAutoHeal) {
      // maybe store a log — we don't attempt healing on restore event
    }
    // Notify admins via alert engine
    if (alertEngine && alertEngine.sendAlert) {
      await alertEngine.sendAlert('systemError', { name: 'Admin', email: payload.adminEmail, error: 'Database restored', action: payload.action });
    }
  } catch (e) {
    console.error('handler DB_RESTORED error', e.message);
  }
});

// Expose a function to register other handlers if needed
module.exports = { init: () => { /* module imports above already register handlers */ } };

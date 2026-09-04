// ai/taskAutomationSheduler.js
const cron = require('node-cron');
const taskAutomationService = require('./taskAutomationService');

let taskScheduled = false;

function initScheduler() {
  if (process.env.NODE_ENV === 'test' || taskScheduled) return;

  cron.schedule('0 8 * * *', async () => {
    console.log('[AutomationScheduler] Running daily automated tasks...');
    try {
      await taskAutomationService.runDailyAutomation();
    } catch (err) {
      console.error('[AutomationScheduler] Error running tasks:', err);
    }
  });

  taskScheduled = true;
}

if (process.env.NODE_ENV !== 'test') {
  initScheduler();
}

module.exports = {
  initScheduler
};

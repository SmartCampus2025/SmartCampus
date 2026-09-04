// ai/taskAutomationScheduler.js
const cron = require('node-cron');
const taskAutomationService = require('./taskAutomationService');

// Run every day at 6 PM
cron.schedule('0 18 * * *', async () => {
  console.log("⚙️ Running daily AI Task Automation...");
  await taskAutomationService.runAllTasks();
});
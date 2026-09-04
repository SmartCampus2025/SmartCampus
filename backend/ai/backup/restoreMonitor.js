// ai/backup/restoreMonitor.js
const cron = require('node-cron');
const { exec } = require('child_process');
const { restoreFromBackup } = require('./restoreManager');
const logger = require('../../utils/logger');

function initRestoreMonitor() {
  if (process.env.NODE_ENV === 'test') return;

  cron.schedule('0 2 * * *', async () => {
    logger.info('[RestoreMonitor] Running nightly restore monitor checks...');
  });
}

if (process.env.NODE_ENV !== 'test') {
  initRestoreMonitor();
}

module.exports = {
  initRestoreMonitor
};

// ai/backup/restoreMonitor.js
const cron = require("node-cron");
const { exec } = require("child_process");
const { restoreFromBackup } = require("./restoreManager");
const logger = require("../../utils/logger");

// Simple DB health check command (PostgreSQL example)
// You can replace with MongoDB or MySQL equivalent.
function checkDatabaseHealth() {
  return new Promise((resolve, reject) => {
    exec("pg_isready", (error, stdout, stderr) => {
      if (error) {
        return reject(stderr || error.message);
      }
      if (stdout.includes("accepting connections")) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

// Monitor database health every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  try {
    logger.info("🔍 Checking database health...");

    const healthy = await checkDatabaseHealth();

    if (!healthy) {
      logger.error("⚠️ Database corruption or unavailability detected.");
      logger.info("🔄 Attempting automatic restore from latest backup...");

      const result = await restoreFromBackup();

      if (result.success) {
        logger.info("✅ Database successfully restored from latest backup.");
      } else {
        logger.error("❌ Restore failed. Manual intervention required.", result.error);
      }
    } else {
      logger.info("✅ Database is healthy.");
    }
  } catch (err) {
    logger.error("❌ Error while monitoring database health.", err);
  }
});

module.exports = {
  checkDatabaseHealth,
};
// ai/backup/backupService.js
import fs from "fs";
import path from "path";
import cron from "node-cron";
import { exec } from "child_process";
import logger from "../../utils/logger.js";

const BACKUP_DIR = path.resolve("backups");
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);

class BackupService {
  constructor(dbName, dbUser, dbPassword) {
    this.dbName = dbName;
    this.dbUser = dbUser;
    this.dbPassword = dbPassword;
  }

  createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(BACKUP_DIR, `${this.dbName}-${timestamp}.sql`);

    const dumpCommand = `mysqldump -u${this.dbUser} -p${this.dbPassword} ${this.dbName} > "${backupFile}"`;

    exec(dumpCommand, (err) => {
      if (err) {
        logger.error("❌ Backup failed: ", err);
      } else {
        logger.info(`✅ Backup created: ${backupFile}`);
      }
    });
  }

  restoreBackup(backupFile) {
    const restoreCommand = `mysql -u${this.dbUser} -p${this.dbPassword} ${this.dbName} < "${backupFile}"`;

    exec(restoreCommand, (err) => {
      if (err) {
        logger.error("❌ Restore failed: ", err);
      } else {
        logger.info(`♻️ Database restored successfully from ${backupFile}`);
      }
    });
  }

  scheduleDailyBackup() {
    cron.schedule("0 2 * * *", () => {
      logger.info("⏳ Running scheduled daily backup...");
      this.createBackup();
    });
  }
}

export default BackupService;

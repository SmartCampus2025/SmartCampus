// ai/backup/cloudSyncService.js
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import logger from "../../utils/logger.js";

const BACKUP_DIR = path.resolve("backups");

class CloudSyncService {
  constructor(driveAuth) {
    this.drive = google.drive({ version: "v3", auth: driveAuth });
  }

  async uploadBackup(fileName) {
    try {
      const filePath = path.join(BACKUP_DIR, fileName);
      const response = await this.drive.files.create({
        requestBody: {
          name: fileName,
          parents: ["your_google_drive_folder_id"], // replace with real folder
        },
        media: {
          mimeType: "application/sql",
          body: fs.createReadStream(filePath),
        },
      });
      logger.info(`☁️ Backup uploaded to Drive: ${response.data.id}`);
    } catch (err) {
      logger.error("❌ Cloud upload failed: ", err);
    }
  }
}

export default CloudSyncService;
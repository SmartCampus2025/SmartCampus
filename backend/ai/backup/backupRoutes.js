// ai/backup/backupRoutes.js
import express from "express";
import BackupService from "./backupService.js";
import logger from "../../utils/logger.js";

const router = express.Router();

const backupService = new BackupService(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS
);

// Manual backup route
router.post("/backup", (req, res) => {
  backupService.createBackup();
  res.json({ message: "Backup initiated" });
});

// Manual restore route
router.post("/restore", (req, res) => {
  const { fileName } = req.body;
  if (!fileName) return res.status(400).json({ error: "File name required" });

  backupService.restoreBackup(fileName);
  res.json({ message: `Restore initiated for ${fileName}` });
});

export default router;
// backend/ai/backup/backupRoutes.js
const express = require('express');
const BackupService = require('./backupService');
const logger = require('../../utils/logger');

const router = express.Router();

const backupService = new BackupService(
  process.env.DB_NAME || 'smartcampus',
  process.env.DB_USER || 'admin',
  process.env.DB_PASS || 'pass'
);

router.post('/create', async (req, res) => {
  try {
    const file = await backupService.createBackup();
    res.json({ success: true, file });
  } catch (err) {
    logger.error('Backup error', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

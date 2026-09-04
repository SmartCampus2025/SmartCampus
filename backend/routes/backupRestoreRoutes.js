const express = require('express');
const router = express.Router();
const backupController = require('../controllers/backupController');

router.get('/backup', backupController.backupDatabase);
router.post('/restore', backupController.restoreDatabase);

module.exports = router;
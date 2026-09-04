// routes/taskAutomationRoutes.js
const express = require('express');
const router = express.Router();
const taskAutomationController = require('../ai/taskAutomationController');

// Manual trigger (for admin dashboard)
router.post('/run', taskAutomationController.runAutomation);

module.exports = router;
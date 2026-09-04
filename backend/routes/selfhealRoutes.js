const express = require('express');
const router = express.Router();
const { getHealth, forceHeal, getLogs, clearLogs } = require('../controllers/selfHealController');

// Public/admin endpoints (protect with auth if needed)
router.get('/health', getHealth);     // system snapshot
router.post('/heal', forceHeal);      // manual trigger
router.get('/logs', getLogs);         // view logs
router.delete('/logs', clearLogs);    // clear logs

module.exports = router;
const express = require('express');
const router = express.Router();

const {
  studentDecisionSupport,
  financeDecisionSupport,
  acknowledgeInsight,
  listInsights
} = require('../controllers/decisionSupportController');

// You can add auth middleware here if required (e.g., require('../middleware/auth'))
router.get('/student/:studentId', studentDecisionSupport);
router.get('/finance/overview', financeDecisionSupport);

router.post('/ack/:insightId', acknowledgeInsight);
router.get('/insights', listInsights);

module.exports = router;
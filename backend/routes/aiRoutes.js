// backend/routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const predictiveAnalyticsController = require("../ai/predictiveAnalyticsController");

// POST /api/ai/performance
router.post("/performance", predictiveAnalyticsController.getPerformancePrediction);

// POST /api/ai/fee-default
router.post("/fee-default", predictiveAnalyticsController.getFeeDefaultPrediction);

module.exports = router;
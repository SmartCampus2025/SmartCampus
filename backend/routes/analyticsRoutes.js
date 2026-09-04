// routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Routes
router.post('/', analyticsController.createAnalytics);
router.get('/', analyticsController.getAllAnalytics);
router.get('/:id', analyticsController.getAnalyticsByStudent);
router.delete('/:id', analyticsController.deleteAnalytics);

module.exports = router;
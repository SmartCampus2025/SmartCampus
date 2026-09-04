const express = require('express');
const router = express.Router();
const {
  createSchedule,
  getSchedules,
  getScheduleByClass
} = require('../controllers/examScheduleController');

// Create a schedule
router.post('/create', createSchedule);

// Get all schedules
router.get('/', getSchedules);

// Get schedule by class
router.get('/:className', getScheduleByClass);

module.exports = router;
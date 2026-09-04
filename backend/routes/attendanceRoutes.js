const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getClassAttendance,
  getStudentAttendance
} = require('../controllers/attendanceController');

// Mark attendance
router.post('/mark', markAttendance);

// Get class attendance
router.get('/class', getClassAttendance);

// Get student attendance summary
router.get('/student/:studentId', getStudentAttendance);

module.exports = router;
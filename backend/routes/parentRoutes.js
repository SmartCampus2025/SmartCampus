const express = require('express');
const router = express.Router();
const {
  registerParent,
  viewAttendance,
  viewResults,
  downloadMarksheet
} = require('../controllers/parentController');

// Register parent
router.post('/register', registerParent);

// Attendance & Results
router.get('/attendance/:studentId', viewAttendance);
router.get('/results/:studentId', viewResults);

// Download PDF
router.get('/marksheet', downloadMarksheet);

module.exports = router;
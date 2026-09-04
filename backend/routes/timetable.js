// backend/routes/timetable.js
const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');

// Protected endpoints; use your auth middleware as required
router.post('/generate', timetableController.generateTimetable);   // run now
router.get('/latest/:schoolId', timetableController.getLatestTimetable);
router.post('/adjust', timetableController.adjustTimetable);       // small tweak call (e.g., after teacher unavailability)

// generate timetable automatically
router.post('/generate', timetableController.generate);

// fetch timetable by class/teacher
router.get('/:classId', timetableController.getByClass);
router.get('/teacher/:teacherId', timetableController.getByTeacher);

module.exports = router;
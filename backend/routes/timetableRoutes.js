const express = require('express');
const router = express.Router();
const {
  createTimetableEntry,
  getClassTimetable,
  getTeacherTimetable,
  deleteTimetableEntry
} = require('../controllers/timetableController');

// Add new timetable entry
router.post('/', createTimetableEntry);

// Get timetable for a class
router.get('/class/:classId', getClassTimetable);

// Get timetable for a teacher
router.get('/teacher/:teacherId', getTeacherTimetable);

// Delete timetable entry
router.delete('/:id', deleteTimetableEntry);

module.exports = router;
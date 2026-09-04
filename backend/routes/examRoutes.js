const express = require('express');
const router = express.Router();
const {
  createExam,
  addResult,
  getResultsByClass,
  getStudentResults
} = require('../controllers/examController');

// Create exam
router.post('/create', createExam);

// Add student marks
router.post('/result/add', addResult);

// Class-wise results
router.get('/results/class/:className', getResultsByClass);

// Student result history
router.get('/results/student/:studentId', getStudentResults);

module.exports = router;
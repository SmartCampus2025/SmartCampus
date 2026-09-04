const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/submit', resultController.submitResult);
router.post('/auto-rank', resultController.autoRankStudents);
router.get('/student', resultController.getStudentResult);

module.exports = router;
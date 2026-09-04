// backend/routes/marksheet.js
const express = require('express');
const router = express.Router();
const marksheetController = require('../controllers/marksheetController');
const auth = require('../middleware/auth'); // your auth middleware

// POST /api/marksheet/share  { studentId, examId, channels: ['sms','email'], recipients?: {sms:[..], email:[..]} }
router.post('/share', auth.ensureTeacherOrAdmin, marksheetController.shareMarksheet);
// GET /api/marksheet/:studentId/:examId -> download/view
router.get('/:studentId/:examId', auth.ensureAny, marksheetController.download);

module.exports = router;
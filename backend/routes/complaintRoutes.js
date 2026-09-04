const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.post('/submit', complaintController.submitComplaint);
router.get('/all', complaintController.getAllComplaints);
router.put('/resolve/:id', complaintController.resolveComplaint);

module.exports = router;
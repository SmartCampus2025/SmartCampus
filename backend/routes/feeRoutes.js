const express = require('express');
const router = express.Router();
const {
  createFee,
  makePayment,
  getStudentFees,
  getOutstandingDues
} = require('../controllers/feeController');

// POST: Create new fee
router.post('/create', createFee);

// POST: Make a payment
router.post('/pay', makePayment);

// GET: Student fee history
router.get('/student/:studentId', getStudentFees);

// GET: Outstanding dues
router.get('/dues', getOutstandingDues);

module.exports = router;
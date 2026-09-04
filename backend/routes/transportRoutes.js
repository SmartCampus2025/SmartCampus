const express = require('express');
const router = express.Router();
const {
  addTransport,
  assignStudent,
  getAllTransports,
  getTransportById
} = require('../controllers/transportController');

// POST: Add transport
router.post('/add', addTransport);

// POST: Assign student
router.post('/assign', assignStudent);

// GET: All transports
router.get('/all', getAllTransports);

// GET: One transport by ID
router.get('/:id', getTransportById);

module.exports = router;
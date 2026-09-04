const express = require('express');
const router = express.Router();
const Staff = require('../models/staffModel');

// Add Staff
router.post('/', async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Staff
router.get('/', async (req, res) => {
  try {
    const allStaff = await Staff.find();
    res.json(allStaff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
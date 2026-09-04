const express = require('express');
const router = express.Router();
const AcademicCalendar = require('../models/calendarModel');

// Add Calendar Event
router.post('/', async (req, res) => {
  try {
    const entry = await AcademicCalendar.create(req.body);
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Calendar Entries
router.get('/', async (req, res) => {
  try {
    const events = await AcademicCalendar.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
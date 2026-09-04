const express = require('express');
const router = express.Router();
const Homework = require('../models/homeworkModel');

router.post('/', async (req, res) => {
  try {
    const homework = await Homework.create(req.body);
    res.json(homework);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const homeworkList = await Homework.find();
    res.json(homeworkList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
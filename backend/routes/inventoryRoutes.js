const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventoryModel');

// Add Item
router.post('/', async (req, res) => {
  try {
    const item = await Inventory.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Items
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
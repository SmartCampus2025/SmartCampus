// backend/routes/eventsRoutes.js
const express = require('express');
const router = express.Router();
const { emitEvent } = require('../ai/events/eventBus');

// POST /api/events/emit
// body: { name: "FEE_DUE", payload: { name, email, phone, amount, dueDate } }
router.post('/emit', async (req, res, next) => {
  try {
    const { name, payload } = req.body;
    if (!name) return res.status(400).json({ error: 'name required' });
    await emitEvent(name, payload || {});
    res.json({ ok: true, message: `Event ${name} emitted` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
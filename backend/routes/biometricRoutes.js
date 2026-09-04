const express = require('express');
const router = express.Router();

// Offline Device Sync Endpoint
router.post('/sync', (req, res) => {
  const { deviceId, data } = req.body;
  console.log(`Biometric sync from device: ${deviceId}`, data);
  res.json({ message: 'Data received and synced ✅' });
});

module.exports = router;
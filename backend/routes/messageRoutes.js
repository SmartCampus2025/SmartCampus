const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getMessagesForUser,
  getAllMessages
} = require('../controllers/messageController');

// Send message
router.post('/send', sendMessage);

// Get messages for a user
router.get('/inbox/:userId', getMessagesForUser);

// Get all messages (admin)
router.get('/log', getAllMessages);

module.exports = router;
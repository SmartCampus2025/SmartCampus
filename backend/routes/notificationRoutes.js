const express = require('express');
const router = express.Router();
const {
  sendNotification,
  getNotifications,
  markAsRead
} = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require auth
router.use(authMiddleware);

// POST: Send notification
router.post('/send', sendNotification);

// GET: Fetch notifications for user
router.get('/user', getNotifications);

// PATCH: Mark as read
router.patch('/read', markAsRead);

module.exports = router;
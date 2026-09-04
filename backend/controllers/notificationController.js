const Notification = require('../models/notificationModel');

// Send a new notification
exports.sendNotification = async (req, res) => {
  try {
    const notification = await Notification.create({
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send notification' });
  }
};

// Get notifications for a user type
exports.getNotifications = async (req, res) => {
  try {
    const role = req.user.role || 'All';
    const notifications = await Notification.find({
      $or: [{ targetAudience: 'All' }, { targetAudience: role }]
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.body;
    await Notification.findByIdAndUpdate(notificationId, {
      $addToSet: { readBy: req.user._id }
    });

    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating read status' });
  }
};
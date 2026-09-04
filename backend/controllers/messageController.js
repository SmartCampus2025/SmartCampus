const Message = require('../models/messageModel');

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    // Future: Integrate with Twilio, Mailgun, etc.
    res.status(201).json({ message: 'Message sent', data: message });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message' });
  }
};

// Get messages for a user
exports.getMessagesForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({ receiverId: userId }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

// Get message log (admin use)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('senderId receiverId');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch message logs' });
  }
};
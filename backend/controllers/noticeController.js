const Notice = require('../models/noticeModel');

// Add a new notice
exports.addNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json({ message: 'Notice added', notice });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add notice' });
  }
};

// Get current valid notices
exports.getValidNotices = async (req, res) => {
  try {
    const today = new Date();
    const notices = await Notice.find({ 
      $or: [
        { expiryDate: { $exists: false } },
        { expiryDate: { $gte: today } }
      ]
    }).sort({ createdAt: -1 });

    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get notices' });
  }
};

// Delete a notice
exports.deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    await Notice.findByIdAndDelete(id);
    res.json({ message: 'Notice deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete notice' });
  }
};
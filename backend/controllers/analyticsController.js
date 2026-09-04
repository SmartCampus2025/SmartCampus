// controllers/analyticsController.js
const Analytics = require('../models/analyticsModel');

// Create new analytics record
exports.createAnalytics = async (req, res) => {
  try {
    const analytics = new Analytics(req.body);
    await analytics.save();
    res.status(201).json({ message: 'Analytics data created successfully.', analytics });
  } catch (error) {
    res.status(500).json({ message: 'Error creating analytics data.', error });
  }
};

// Get all analytics records
exports.getAllAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find().populate('studentId', 'name rollNo class');
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics.', error });
  }
};

// Get analytics by student
exports.getAnalyticsByStudent = async (req, res) => {
  try {
    const analytics = await Analytics.find({ studentId: req.params.id });
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics for student.', error });
  }
};

// Delete analytics entry
exports.deleteAnalytics = async (req, res) => {
  try {
    const result = await Analytics.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Analytics entry not found.' });
    res.status(200).json({ message: 'Analytics entry deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting analytics entry.', error });
  }
};
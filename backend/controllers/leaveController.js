const Leave = require('../models/leaveModel');

exports.applyLeave = async (req, res) => {
  try {
    const leave = await Leave.create(req.body);
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ error: 'Failed to apply leave' });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('studentId');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get leaves' });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const updated = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update leave' });
  }
};
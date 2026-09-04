const Complaint = require('../models/complaintModel');

exports.submitComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit complaint' });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('userId');
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get complaints' });
  }
};

exports.resolveComplaint = async (req, res) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update complaint' });
  }
};
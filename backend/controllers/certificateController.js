const Certificate = require('../models/certificateModel');

exports.requestCertificate = async (req, res) => {
  try {
    const cert = await Certificate.create(req.body);
    res.status(201).json(cert);
  } catch (error) {
    res.status(500).json({ error: 'Failed to request certificate' });
  }
};

exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().populate('studentId');
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get certificates' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cert);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update certificate' });
  }
};
const Fee = require('../models/feeModel');

// Add a new fee record
exports.createFee = async (req, res) => {
  try {
    const fee = await Fee.create(req.body);
    res.status(201).json(fee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create fee record' });
  }
};

// Make a payment
exports.makePayment = async (req, res) => {
  try {
    const { feeId, amount } = req.body;
    const fee = await Fee.findById(feeId);

    if (!fee) return res.status(404).json({ message: 'Fee record not found' });

    fee.paidAmount += amount;
    await fee.save();

    res.json({ message: 'Payment successful', fee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Payment failed' });
  }
};

// Get student’s fee history
exports.getStudentFees = async (req, res) => {
  try {
    const fees = await Fee.find({ studentId: req.params.studentId });
    res.json(fees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch fee history' });
  }
};

// Get all outstanding dues
exports.getOutstandingDues = async (req, res) => {
  try {
    const dues = await Fee.find({ status: { $ne: 'Paid' } });
    res.json(dues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch outstanding dues' });
  }
};
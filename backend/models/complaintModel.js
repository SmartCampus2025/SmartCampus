const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'userType',
    required: true
  },
  userType: {
    type: String,
    enum: ['Student', 'Teacher', 'Clerk'],
    required: true
  },
  complaintText: String,
  status: {
    type: String,
    enum: ['Pending', 'Resolved', 'Rejected'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  certificateType: String,
  issueDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Requested', 'Issued', 'Rejected'],
    default: 'Requested'
  }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
// models/analyticsModel.js
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  type: {
    type: String,
    enum: ['attendance', 'exam', 'behavior'],
    required: true
  },
  dataPoints: [
    {
      label: String,
      value: Number,
      date: Date
    }
  ],
  generatedBy: {
    type: String,
    enum: ['system', 'admin', 'teacher'],
    default: 'system'
  },
  generatedAt: {
    type: Date,
    default: Date.now
  },
  remarks: String
});

module.exports = mongoose.model('Analytics', analyticsSchema);
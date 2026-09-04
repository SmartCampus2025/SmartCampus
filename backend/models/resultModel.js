const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  examType: {
    type: String,
    enum: ['Midterm', 'Final', 'Monthly', 'Custom'],
    required: true,
  },
  marks: [
    {
      subject: { type: String, required: true },
      obtainedMarks: { type: Number, required: true },
      totalMarks: { type: Number, required: true },
    },
  ],
  totalObtained: Number,
  totalMarks: Number,
  percentage: Number,
  grade: String,
  position: Number, // filled by auto-ranking system
  status: {
    type: String,
    enum: ['Draft', 'Finalized', 'Error'],
    default: 'Draft',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Result', resultSchema);
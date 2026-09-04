const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  className: { type: String, required: true },
  subject: { type: String, required: true },
  examDate: { type: Date, required: true },
  totalMarks: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
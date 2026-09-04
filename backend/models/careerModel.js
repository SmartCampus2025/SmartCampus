const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  interestAreas: [String],
  suggestedFields: [String],
  counselorNotes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Career', careerSchema);
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  type: { type: String, enum: ['Full-Time', 'Part-Time', 'Internship'], default: 'Full-Time' },
  description: String,
  deadline: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
  class: String,
  subject: String,
  date: Date,
  assignedBy: String,
  details: String,
});

module.exports = mongoose.model('Homework', homeworkSchema);
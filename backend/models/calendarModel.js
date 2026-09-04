const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
  title: String,
  date: Date,
  description: String
});

module.exports = mongoose.model('AcademicCalendar', calendarSchema);
// backend/models/Timetable.js
const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  classId: String,
  subject: String,
  teacherId: String,
  roomId: String,
  day: String,
  startTime: String,
  endTime: String,
});

module.exports = mongoose.model('Timetable', timetableSchema);
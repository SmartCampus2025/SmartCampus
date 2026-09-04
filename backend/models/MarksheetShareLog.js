// backend/models/MarksheetShareLog.js
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  studentId: String,
  examId: String,
  sharedBy: String,
  channels: [String], // e.g. ['sms','email','whatsapp']
  recipients: [String],
  fileUrl: String,
  status: String,
  meta: Object,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('MarksheetShareLog', schema);
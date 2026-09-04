const mongoose = require('mongoose');

const parentAccessSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  parentName: String,
  phone: String,
  email: String,
  receiveNotifications: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('ParentAccess', parentAccessSchema);
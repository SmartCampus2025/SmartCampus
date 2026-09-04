const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  class: { type: String, default: 'All' }, // For specific class or All
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expiryDate: Date,
  isImportant: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject: String,
  content: { type: String, required: true },
  method: { type: String, enum: ['System', 'SMS', 'Email', 'WhatsApp'], default: 'System' },
  sentAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Sent', 'Failed'], default: 'Sent' }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
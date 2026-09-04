const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isFull: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Hostel', hostelSchema);
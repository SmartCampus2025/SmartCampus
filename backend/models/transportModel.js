const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  route: { type: String, required: true },
  driverName: { type: String },
  driverContact: { type: String },
  capacity: { type: Number },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Transport', transportSchema);
const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: String,
  department: String,
  designation: String,
  contact: String,
  email: String,
  gender: String,
  joiningDate: Date,
  qualification: String,
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional for biometric
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // For teachers/admins
  className: { type: String },
  subject: { type: String },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Leave'], default: 'Present' },

  // Biometric extension
  inTime: { type: String },
  outTime: { type: String },
  isBiometric: { type: Boolean, default: false },
  isSynced: { type: Boolean, default: true },
  biometricHash: { type: String }
}, { timestamps: true });

// Index for class attendance
attendanceSchema.index({ studentId: 1, subject: 1, date: 1 }, { unique: false });
// Index for biometric attendance
attendanceSchema.index({ staffId: 1, date: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);
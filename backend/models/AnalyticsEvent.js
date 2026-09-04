const mongoose = require('mongoose');

const analyticsEventSchema = new mongoose.Schema({
  userRole: {
    type: String,
    enum: ['admin', 'teacher', 'student', 'clerical'],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'userRole',
    required: true,
  },
  eventType: {
    type: String,
    enum: ['login', 'logout', 'error', 'page_view', 'action'],
    required: true,
  },
  route: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  device: String,
  platform: String,
  additionalInfo: Object,
}, { timestamps: true });

module.exports = mongoose.model('AnalyticsEvent', analyticsEventSchema);
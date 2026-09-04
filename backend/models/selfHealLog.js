const mongoose = require('mongoose');

const selfHealLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['database', 'api', 'performance', 'memory', 'security', 'other'],
      default: 'other',
    },
    severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'low' },
    service: { type: String, default: 'backend' },
    endpoint: { type: String }, // e.g. /api/results
    statusCode: { type: Number },
    errorMessage: { type: String },
    stack: { type: String },

    // Metrics snapshot
    metrics: {
      responseTimeMs: Number,
      memoryMB: Number,
      cpuLoad: Number, // optional future use
      dbState: Number, // mongoose.readyState
    },

    // Healing info
    trigger: {
      source: { type: String, enum: ['monitor', 'manual', 'internal'], default: 'monitor' },
      reason: { type: String },
    },
    actionsTried: [{ name: String, ok: Boolean, note: String }],
    outcome: { type: String, enum: ['resolved', 'deferred', 'failed'], default: 'deferred' },
    resolved: { type: Boolean, default: false },
    notes: { type: String },
  },
  { timestamps: true }
);

selfHealLogSchema.index({ createdAt: -1 });
selfHealLogSchema.index({ type: 1, severity: 1 });

module.exports = mongoose.model('SelfHealLog', selfHealLogSchema);
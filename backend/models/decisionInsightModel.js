const mongoose = require('mongoose');

const decisionInsightSchema = new mongoose.Schema(
  {
    scope: { type: String, enum: ['student', 'finance', 'timetable', 'general'], required: true },
    // When scope === 'student', set studentId; when finance, you may store campus/org id in entityId
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    entityId: { type: String }, // optional grouping key (e.g., campusId, className)
    title: { type: String, required: true },
    message: { type: String, required: true },
    score: { type: Number, default: 0 }, // risk or priority score 0..100
    tags: [{ type: String }], // e.g. ['risk:dropout','academics','finance']
    data: { type: Object }, // snapshot of inputs / features
    acknowledged: { type: Boolean, default: false },
    acknowledgedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    acknowledgedAt: { type: Date }
  },
  { timestamps: true }
);

decisionInsightSchema.index({ scope: 1, createdAt: -1 });
decisionInsightSchema.index({ studentId: 1, createdAt: -1 });

module.exports = mongoose.model('DecisionInsight', decisionInsightSchema);
const mongoose = require("mongoose");

const selfHealEngineSchema = new mongoose.Schema({
  module: {
    type: String,
    required: true,
  },
  issueType: {
    type: String,
    required: true,
  },
  details: String,
  status: {
    type: String,
    default: "detected", // detected | resolved | reported
  },
  resolvedAt: Date,
  logs: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SelfHealLog", selfHealEngineSchema);
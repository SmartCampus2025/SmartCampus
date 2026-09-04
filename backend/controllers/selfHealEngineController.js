const SelfHealLog = require("../models/selfHealEngineModel");

// Log an issue
exports.logIssue = async (req, res) => {
  try {
    const log = new SelfHealLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all logs
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await SelfHealLog.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark issue as resolved
exports.resolveIssue = async (req, res) => {
  try {
    const log = await SelfHealLog.findByIdAndUpdate(
      req.params.id,
      {
        status: "resolved",
        resolvedAt: new Date(),
        $push: { logs: `Issue marked as resolved at ${new Date()}` },
      },
      { new: true }
    );
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete log
exports.deleteLog = async (req, res) => {
  try {
    await SelfHealLog.findByIdAndDelete(req.params.id);
    res.json({ message: "Log deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
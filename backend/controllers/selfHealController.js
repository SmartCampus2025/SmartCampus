const SelfHealLog = require('../models/selfHealLog');
const { checkSystemHealth, attemptAutoHeal } = require('../services/selfHealService');

// GET /api/selfheal/health
exports.getHealth = async (req, res, next) => {
  try {
    const health = await checkSystemHealth();
    res.json({ ok: health.issues.length === 0, health });
  } catch (e) {
    next(e);
  }
};

// POST /api/selfheal/heal
exports.forceHeal = async (req, res, next) => {
  try {
    const ctx = {
      source: 'manual',
      reason: req.body?.reason || 'manual trigger',
      type: req.body?.type || 'other',
      severity: req.body?.severity || 'medium',
      notes: req.body?.notes,
    };
    const result = await attemptAutoHeal(ctx);
    res.json({ message: 'Healing attempted', ...result });
  } catch (e) {
    next(e);
  }
};

// GET /api/selfheal/logs?status=resolved|unresolved&limit=50
exports.getLogs = async (req, res, next) => {
  try {
    const { status, limit = 50 } = req.query;
    const filter = {};
    if (status === 'resolved') filter.resolved = true;
    if (status === 'unresolved') filter.resolved = false;

    const logs = await SelfHealLog.find(filter).sort({ createdAt: -1 }).limit(Number(limit));
    res.json({ count: logs.length, logs });
  } catch (e) {
    next(e);
  }
};

// DELETE /api/selfheal/logs
exports.clearLogs = async (_req, res, next) => {
  try {
    await SelfHealLog.deleteMany({});
    res.json({ message: 'All self-heal logs cleared' });
  } catch (e) {
    next(e);
  }
};
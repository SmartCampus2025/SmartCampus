const onFinished = require('on-finished');
const { attemptAutoHeal } = require('../services/selfHealService');
const SelfHealLog = require('../models/selfHealLog');

const SLOW_MS = Number(process.env.SELFHEAL_SLOW_MS || 1500);
const ERROR_AUTOFIX = String(process.env.SELFHEAL_AUTOFIX_ON_5XX || 'true').toLowerCase() === 'true';

module.exports = function selfHealMonitor(req, res, next) {
  const start = process.hrtime.bigint();

  onFinished(res, async () => {
    try {
      const end = process.hrtime.bigint();
      const durationMs = Number(end - start) / 1e6;

      // Record slow responses
      if (durationMs > SLOW_MS) {
        await SelfHealLog.create({
          type: 'performance',
          severity: durationMs > SLOW_MS * 2 ? 'high' : 'medium',
          service: 'backend',
          endpoint: req.originalUrl,
          statusCode: res.statusCode,
          errorMessage: `Slow response: ${Math.round(durationMs)}ms`,
          metrics: { responseTimeMs: Math.round(durationMs) },
          trigger: { source: 'monitor', reason: 'slow_response' },
          resolved: true,
          outcome: 'resolved',
        });
      }

      // For 5xx errors, try auto-heal non-blocking
      if (res.statusCode >= 500 && ERROR_AUTOFIX) {
        attemptAutoHeal({
          source: 'monitor',
          type: 'api',
          severity: 'high',
          endpoint: req.originalUrl,
          statusCode: res.statusCode,
          reason: '5xx_response',
          notes: 'Auto-heal triggered by selfHealMonitor',
        }).catch(() => {});
      }
    } catch {
      // Never block the request flow even if logging fails
    }
  });

  next();
};
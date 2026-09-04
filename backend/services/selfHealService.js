const mongoose = require('mongoose');
const os = require('os');
const SelfHealLog = require('../models/selfHealLog');
const connectDB = require('../db'); // reuse your existing connector

// ---- Utils
const nowMemoryMB = () => Math.round(process.memoryUsage().rss / (1024 * 1024));

async function ensureDbConnection() {
  const state = mongoose.connection.readyState; // 1 = connected
  if (state === 1) {
    return { name: 'ensureDbConnection', ok: true, note: 'DB already connected' };
  }
  try {
    // Try soft reconnect via your connectDB helper
    await connectDB();
    const ok = mongoose.connection.readyState === 1;
    return { name: 'ensureDbConnection', ok, note: ok ? 'Reconnected to DB' : 'Reconnect failed' };
  } catch (e) {
    return { name: 'ensureDbConnection', ok: false, note: `Reconnect error: ${e.message}` };
  }
}

async function clearInMemoryCache() {
  // Placeholder for future cache (Redis/Node cache)
  return { name: 'clearInMemoryCache', ok: true, note: 'No cache configured; noop' };
}

async function recycleMongooseIndexes() {
  try {
    // No-op until specific models are provided; useful for “Background index build”
    return { name: 'recycleMongooseIndexes', ok: true, note: 'Deferred (no explicit index rebuild)' };
  } catch (e) {
    return { name: 'recycleMongooseIndexes', ok: false, note: e.message };
  }
}

async function softRestartIfAllowed() {
  // Optional: allow the process to exit (Render/PM2 will restart)
  if (String(process.env.ALLOW_SELF_RESTART).toLowerCase() === 'true') {
    setTimeout(() => process.exit(1), 200); // graceful short delay
    return { name: 'softRestart', ok: true, note: 'Process exiting for restart' };
  }
  return { name: 'softRestart', ok: true, note: 'Restart disabled (ALLOW_SELF_RESTART != true)' };
}

// ---- Health check
async function checkSystemHealth() {
  const dbState = mongoose.connection.readyState; // 0=disconnected 1=connected 2=connecting 3=disconnecting
  const mem = nowMemoryMB();

  const issues = [];
  if (dbState !== 1) issues.push({ type: 'database', severity: dbState === 0 ? 'high' : 'medium', reason: `DB state=${dbState}` });
  if (mem > (Number(process.env.SELFHEAL_MEM_WARN_MB) || 700)) {
    issues.push({ type: 'memory', severity: mem > (Number(process.env.SELFHEAL_MEM_CRIT_MB) || 1200) ? 'high' : 'medium', reason: `Memory=${mem}MB` });
  }

  return {
    db: { state: dbState },
    memoryMB: mem,
    cpuLoad: os.loadavg?.()[0] ?? 0,
    issues,
  };
}

// ---- Healing strategy selector
async function attemptAutoHeal(context = {}) {
  const results = [];
  const health = await checkSystemHealth();

  if (health.issues.some(i => i.type === 'database')) {
    results.push(await ensureDbConnection());
  }
  if (health.issues.some(i => i.type === 'memory')) {
    results.push(await clearInMemoryCache());
  }

  // If severe issues remain after basic actions, consider soft restart (if allowed)
  const unresolved = results.some(r => !r.ok);
  if (unresolved) {
    results.push(await recycleMongooseIndexes());
  }

  const finalHealth = await checkSystemHealth();
  const stillBad = finalHealth.issues.length > 0;

  // Optionally restart if problems persist and allowed
  if (stillBad && (process.env.SELFHEAL_ALLOW_RESTART_ON_FAILURE || '').toLowerCase() === 'true') {
    results.push(await softRestartIfAllowed());
  }

  // Log summary
  const log = await SelfHealLog.create({
    type: context.type || 'other',
    severity: context.severity || (stillBad ? 'high' : 'low'),
    service: 'backend',
    endpoint: context.endpoint,
    statusCode: context.statusCode,
    errorMessage: context.errorMessage,
    stack: context.stack,
    metrics: { responseTimeMs: context.responseTimeMs, memoryMB: finalHealth.memoryMB, dbState: finalHealth.db.state },
    trigger: { source: context.source || 'internal', reason: context.reason },
    actionsTried: results,
    outcome: stillBad ? 'failed' : 'resolved',
    resolved: !stillBad,
    notes: context.notes,
  });

  return { results, finalHealth, log };
}

module.exports = {
  checkSystemHealth,
  attemptAutoHeal,
  // export individual actions if needed:
  ensureDbConnection,
  clearInMemoryCache,
  recycleMongooseIndexes,
  softRestartIfAllowed,
};

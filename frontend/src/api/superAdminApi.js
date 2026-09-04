import client from './client';

// System Health & Self-Healing
export const getHealthStatus = () => client.get('/selfheal/health');
export const forceSelfHeal = () => client.post('/selfheal/heal');
export const getSelfHealLogs = () => client.get('/selfheal/logs');

// Fraud & Anomaly Detection
export const checkFraud = (data) => client.post('/fraud/check', data);

// AI Decision Support & Insights
export const getDecisionInsights = () => client.get('/ai/decision-support/insights');
export const getFinanceOverview = () => client.get('/ai/decision-support/finance/overview');
export const acknowledgeInsight = (id) => client.post(`/ai/decision-support/ack/${id}`);

// Database Backup & Restore
export const triggerBackup = () => client.get('/backup/backup');
export const triggerRestore = (data) => client.post('/backup/restore', data);

// Staff / Users List
export const getAllStaff = () => client.get('/staff');

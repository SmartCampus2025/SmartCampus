// ai/dashboards/index.js
const { getAdaptiveDashboard } = require("./adaptiveDashboard");
const { logUsage } = require("./usageTracker");

module.exports = {
  getAdaptiveDashboard,
  logUsage,
};

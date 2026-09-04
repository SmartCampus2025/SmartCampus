// ai/dashboards/dashboardRecommender.js
const roleConfig = require("./roleConfig");
const { getUsage } = require("./usageTracker");

function recommendDashboard(userId, role) {
  const defaultLayout = roleConfig[role] || [];
  const usage = getUsage(userId);

  // Sort features by frequency of usage
  const sortedFeatures = Object.keys(usage).sort(
    (a, b) => usage[b] - usage[a]
  );

  // Merge role defaults with frequently used
  const finalLayout = Array.from(new Set([...sortedFeatures, ...defaultLayout]));

  // Limit dashboard to top 6 features for simplicity
  return finalLayout.slice(0, 6);
}

module.exports = { recommendDashboard };

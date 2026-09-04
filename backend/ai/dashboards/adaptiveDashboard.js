// ai/dashboards/adaptiveDashboard.js
const { recommendDashboard } = require("./dashboardRecommender");

async function getAdaptiveDashboard(userId, role) {
  try {
    const layout = recommendDashboard(userId, role);
    return {
      userId,
      role,
      dashboard: layout,
    };
  } catch (error) {
    console.error("Error generating adaptive dashboard:", error);
    return { userId, role, dashboard: [] };
  }
}

module.exports = { getAdaptiveDashboard };

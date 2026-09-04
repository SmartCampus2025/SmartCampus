// ai/dashboards/usageTracker.js
const fs = require("fs");
const path = require("path");

const usageFile = path.join(__dirname, "usageLogs.json");

function logUsage(userId, feature) {
  let data = {};
  if (fs.existsSync(usageFile)) {
    data = JSON.parse(fs.readFileSync(usageFile));
  }

  if (!data[userId]) {
    data[userId] = {};
  }

  data[userId][feature] = (data[userId][feature] || 0) + 1;

  fs.writeFileSync(usageFile, JSON.stringify(data, null, 2));
}

function getUsage(userId) {
  if (!fs.existsSync(usageFile)) return {};
  const data = JSON.parse(fs.readFileSync(usageFile));
  return data[userId] || {};
}

module.exports = { logUsage, getUsage };

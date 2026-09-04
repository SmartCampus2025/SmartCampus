// backend/ai/dashboards/madrassaDashboard.js
const { getIslamicDate } = require('../madrassa/islamicCalendar');
const { applyMadrassaSupport } = require('../madrassa/madrassaSupport');

async function getMadrassaDashboardData() {
  const date = getIslamicDate();
  const support = await applyMadrassaSupport('General Attendance & Hifz Progress');
  return {
    date,
    support
  };
}

module.exports = {
  getMadrassaDashboardData
};

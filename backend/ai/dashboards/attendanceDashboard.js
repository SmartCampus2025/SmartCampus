// backend/ai/dashboards/attendanceDashboard.js
const { getIslamicDate } = require('../madrassa/islamicCalendar');

function getAttendanceDashboardData() {
  return {
    date: getIslamicDate(),
    overallAttendance: '88%',
    absentToday: 12
  };
}

module.exports = {
  getAttendanceDashboardData
};

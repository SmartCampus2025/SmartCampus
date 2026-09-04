const Attendance = require('../models/attendanceModel');

const getMonthlySummary = async (studentId, month, year) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const records = await Attendance.find({
    studentId,
    date: { $gte: startDate, $lte: endDate }
  });

  let summary = { Present: 0, Absent: 0, Leave: 0 };

  records.forEach((record) => {
    summary[record.status]++;
  });

  return summary;
};

module.exports = getMonthlySummary;
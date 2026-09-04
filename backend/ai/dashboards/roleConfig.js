// ai/dashboards/roleConfig.js
module.exports = {
  admin: ["studentStats", "financeOverview", "alerts", "systemHealth"],
  teacher: ["attendance", "examResults", "assignments", "notices"],
  student: ["timetable", "assignments", "results", "attendance"],
  clerical: ["admissions", "fees", "documents", "notices"],
  parent: ["studentPerformance", "attendance", "alerts", "fees"],
  madrassa: ["dailyLessons", "attendance", "notices", "studentProgress"],
};

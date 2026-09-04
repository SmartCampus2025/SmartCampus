// ai/taskAutomationService.js
const Attendance = require('../models/attendanceModel');
const Fee = require('../models/feeModel');
const Result = require('../models/resultModel');
const notificationService = require('../utils/notificationService'); // SMS/Email/WhatsApp

module.exports.runAllTasks = async () => {
  const logs = [];

  // 1. Attendance Check
  const absentees = await Attendance.find({ status: 'absent', date: new Date().toISOString().split('T')[0] });
  if (absentees.length > 0) {
    logs.push(`⚠️ ${absentees.length} absentees found`);
    absentees.forEach(student => {
      notificationService.sendAlert(student.parentId, `Your child ${student.studentName} was absent today.`);
    });
  }

  // 2. Fee Reminder
  const pendingFees = await Fee.find({ status: 'pending' });
  if (pendingFees.length > 0) {
    logs.push(`💰 ${pendingFees.length} pending fees reminders sent`);
    pendingFees.forEach(fee => {
      notificationService.sendAlert(fee.studentId, `Reminder: Your fee of ${fee.amount} is due.`);
    });
  }

  // 3. Auto Report Generation
  const results = await Result.find({ generated: false });
  for (let result of results) {
    result.generated = true;
    await result.save();
    logs.push(`📊 Report card generated for ${result.studentName}`);
  }

  return logs;
};
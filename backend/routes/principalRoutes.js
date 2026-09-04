const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');
const Staff = require('../models/staffModel');
const Attendance = require('../models/attendanceModel');

router.get('/stats', async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalStaff = await Staff.countDocuments();
    const totalAttendanceToday = await Attendance.countDocuments({ date: new Date().toDateString() });

    res.json({
      totalStudents,
      totalStaff,
      todayAttendance: totalAttendanceToday,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
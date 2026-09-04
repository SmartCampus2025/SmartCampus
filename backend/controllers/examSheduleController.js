const ExamSchedule = require('../models/examScheduleModel');

// Create exam schedule
exports.createSchedule = async (req, res) => {
  try {
    const schedule = new ExamSchedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Error creating schedule', error });
  }
};

// Get all schedules
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await ExamSchedule.find().sort({ examDate: 1 });
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedules', error });
  }
};

// Get schedule by class name
exports.getScheduleByClass = async (req, res) => {
  try {
    const { className } = req.params;
    const schedules = await ExamSchedule.find({ className }).sort({ examDate: 1 });
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching class schedule', error });
  }
};
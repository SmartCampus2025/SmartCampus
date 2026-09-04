// backend/controllers/timeTableController.js
const timetableService = require('../services/timeTableService');

exports.generateTimetable = async (req, res) => {
  try {
    const { schoolId, force } = req.body;
    if (!schoolId) return res.status(400).json({ error: 'schoolId required' });

    const result = await timetableService.generateForSchool(schoolId, { force, triggeredBy: req.user?.id });
    return res.json(result);
  } catch (err) {
    console.error('generateTimetable', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getLatestTimetable = async (req, res) => {
  try {
    const schoolId = req.params.schoolId;
    const timetable = await timetableService.getLatest(schoolId);
    return res.json({ status: 'ok', data: timetable });
  } catch (err) {
    console.error('getLatestTimetable', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.adjustTimetable = async (req, res) => {
  try {
    const { schoolId, adjustment } = req.body;
    const result = await timetableService.applyAdjustment(schoolId, adjustment, { actor: req.user?.id });
    return res.json(result);
  } catch (err) {
    console.error('adjustTimetable', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.generate = async (req, res) => {
  try {
    const result = await timetableService.generate(req.body.constraints);
    return res.json(result);
  } catch (err) {
    console.error('Timetable generate error', err);
    res.status(500).json({ error: 'Failed to generate timetable' });
  }
};

exports.getByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const result = await timetableService.getByClass(classId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const result = await timetableService.getByTeacher(teacherId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTimetableEntry = async (req, res) => {
  try {
    res.status(201).json({ message: 'Timetable entry created', data: req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClassTimetable = exports.getByClass;
exports.getTeacherTimetable = exports.getByTeacher;

exports.deleteTimetableEntry = async (req, res) => {
  try {
    res.json({ message: 'Timetable entry deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

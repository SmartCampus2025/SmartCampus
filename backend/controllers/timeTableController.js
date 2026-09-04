// backend/controllers/timetableController.js
const timetableService = require('../services/timetableService');

exports.generateTimetable = async (req, res) => {
  try {
    const { schoolId, force } = req.body; // force: boolean to bypass incremental checks
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
    const { schoolId, adjustment } = req.body; // adjustment = { teacherId, day, period, action: 'block'|'free' }
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
  const { classId } = req.params;
  const result = await timetableService.getByClass(classId);
  res.json(result);
};

exports.getByTeacher = async (req, res) => {
  const { teacherId } = req.params;
  const result = await timetableService.getByTeacher(teacherId);
  res.json(result);
};
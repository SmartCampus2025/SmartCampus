// backend/services/timeTableService.js
const optimizer = require('./timeTableOptimizer');
const socketUtils = require('../utils/socket');
const aiTimeTableEngine = require('./aiTimeTableEngine');

async function fetchConstraints(schoolId) {
  return { teachers: [], groups: [], subjects: [], rooms: [] };
}

async function generateForSchool(schoolId, opts = {}) {
  const data = await fetchConstraints(schoolId);
  const { timetable, score, diagnostics } = optimizer.optimize(data, {
    periodsPerDay: 8,
    daysPerWeek: 5,
    maxIterations: 200
  });

  const io = socketUtils.getIO();
  if (io) io.to(`school_${schoolId}`).emit('timetable_updated', { schoolId, score });

  return { status: 'ok', score, diagnostics, timetable };
}

async function getLatest(schoolId) {
  return { school: schoolId, timetable: [] };
}

async function applyAdjustment(schoolId, adjustment, meta = {}) {
  const latest = await getLatest(schoolId);
  const { repairedTimetable, score, diagnostics } = optimizer.repair(latest.timetable, adjustment);

  const io = socketUtils.getIO();
  if (io) io.to(`school_${schoolId}`).emit('timetable_adjusted', { schoolId, score });

  return { status: 'ok', score, diagnostics, timetable: repairedTimetable };
}

async function generate(constraints) {
  const classes = [{ id: '10-A' }, { id: '10-B' }];
  const teachers = [{ id: 'T1', subjects: ['Math'] }, { id: 'T2', subjects: ['English'] }];
  const rooms = [{ id: 'R1' }, { id: 'R2' }];
  const subjects = [{ classId: '10-A', name: 'Math' }, { classId: '10-A', name: 'English' }];

  const result = await aiTimeTableEngine.generateTimetable(classes, teachers, rooms, subjects, constraints);
  return result;
}

async function getByClass(classId) {
  return [];
}

async function getByTeacher(teacherId) {
  return [];
}

module.exports = {
  generateForSchool,
  getLatest,
  applyAdjustment,
  generate,
  getByClass,
  getByTeacher
};

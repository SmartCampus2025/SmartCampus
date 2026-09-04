// backend/services/timetableService.js
// High-level wiring: fetch constraints, call optimizer, save timetable, emit socket events.

const optimizer = require('./timetableOptimizer');
const socketUtils = require('../utils/socket');

// Replace these with your actual data access methods (Mongoose models or DB services)
const Teacher = require('../models/Teacher');
const ClassGroup = require('../models/ClassGroup'); // e.g., class 10-A
const Subject = require('../models/Subject');
const Room = require('../models/ClassRoom');
const TimetableModel = require('../models/Timetable');

async function fetchConstraints(schoolId) {
  // NOTE: adapt queries to your DB layer
  const teachers = await Teacher.find({ school: schoolId }).lean();
  const groups = await ClassGroup.find({ school: schoolId }).lean();
  const subjects = await Subject.find({ school: schoolId }).lean();
  const rooms = await Room.find({ school: schoolId }).lean();

  // Also fetch teacher availability, room capacity, special constraints
  // For now assume each teacher object has { id, subjects: [subjectId], availability: { day: [periodsAvailable] } }
  return { teachers, groups, subjects, rooms };
}

async function generateForSchool(schoolId, opts = {}) {
  // 1. fetch constraints/data
  const data = await fetchConstraints(schoolId);

  // 2. call optimizer
  const { timetable, score, diagnostics } = optimizer.optimize(data, {
    periodsPerDay: 8,
    daysPerWeek: 5,
    maxIterations: 200
  });

  // 3. persist timetable (upsert)
  const saved = await TimetableModel.create({
    school: schoolId,
    createdBy: opts.triggeredBy || null,
    createdAt: new Date(),
    timetable,
    score,
    diagnostics
  });

  // 4. emit to connected admin users via socket
  const io = socketUtils.get();
  if (io) io.to(`school_${schoolId}`).emit('timetable_updated', { schoolId, id: saved._id, score });

  return { status: 'ok', id: saved._id, score, diagnostics };
}

async function getLatest(schoolId) {
  return TimetableModel.findOne({ school: schoolId }).sort({ createdAt: -1 }).lean();
}

async function applyAdjustment(schoolId, adjustment, meta = {}) {
  // Simple adjustment API: mark a teacher as unavailable for specific day/period -> attempt localized reschedule
  // Fetch latest timetable
  const latest = await getLatest(schoolId);
  if (!latest) return { status: 'error', message: 'No timetable exists' };

  const current = latest.timetable; // expected structure: { day: { period: { groupId, subjectId, teacherId, roomId } } }
  // Apply the adjustment
  // Example adjustment: { teacherId, day: 1, period: 3, action: 'block' } -> remove that assignment
  const { teacherId, day, period, action } = adjustment;
  for (const d in current) {
    if (parseInt(d) === day) {
      const p = current[d][period];
      if (p && p.teacherId === teacherId) {
        if (action === 'block') {
          // remove assignment and try to find replacement
          current[d][period] = null;
        }
      }
    }
  }

  // Try quick local repair with optimizer.repair
  const { repairedTimetable, score, diagnostics } = optimizer.repair(latest.timetable, {
    teacherId, day, period
  });

  // Save new version
  const saved = await TimetableModel.create({
    school: schoolId,
    createdBy: meta.actor || null,
    createdAt: new Date(),
    timetable: repairedTimetable,
    score,
    diagnostics
  });

  const io = socketUtils.get();
  if (io) io.to(`school_${schoolId}`).emit('timetable_adjusted', { schoolId, id: saved._id, score });

  return { status: 'ok', id: saved._id, score, diagnostics };
}

module.exports = { generateForSchool, getLatest, applyAdjustment };


// backend/services/timetableService.js
const Timetable = require('../models/Timetable');
const aiTimetableEngine = require('./aiTimetableEngine');

async function generate(constraints) {
  // fetch classes, teachers, rooms, subjects from DB (simplified here)
  const classes = await getClasses();
  const teachers = await getTeachers();
  const rooms = await getRooms();
  const subjects = await getSubjects();

  const result = await aiTimetableEngine.generateTimetable(classes, teachers, rooms, subjects, constraints);
  await Timetable.deleteMany({}); // clear old
  await Timetable.insertMany(result);
  return result;
}

async function getByClass(classId) {
  return Timetable.find({ classId });
}

async function getByTeacher(teacherId) {
  return Timetable.find({ teacherId });
}

// placeholders — replace with real DB models
async function getClasses() { return [{ id: '10-A' }, { id: '10-B' }]; }
async function getTeachers() { return [{ id: 'T1', subjects: ['Math'] }, { id: 'T2', subjects: ['English'] }]; }
async function getRooms() { return [{ id: 'R1' }, { id: 'R2' }]; }
async function getSubjects() { return [{ classId: '10-A', name: 'Math' }, { classId: '10-A', name: 'English' }]; }

module.exports = { generate, getByClass, getByTeacher };
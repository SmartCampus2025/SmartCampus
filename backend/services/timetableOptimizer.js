// backend/services/timetableOptimizer.js
// Greedy + local swap optimizer. Input 'data' contains teachers, groups, subjects, rooms.
// Output: { timetable, score, diagnostics }
// Timetable structure chosen: timetable[dayIndex][periodIndex] = { groupId, subjectId, teacherId, roomId }

const _ = require('lodash');

function buildEmptySchedule(daysPerWeek, periodsPerDay) {
  const schedule = [];
  for (let d = 0; d < daysPerWeek; d++) {
    schedule[d] = [];
    for (let p = 0; p < periodsPerDay; p++) schedule[d][p] = null;
  }
  return schedule;
}

function scoreSchedule(schedule, data) {
  // Higher is better. Penalize conflicts, teacher double-booking, room capacity breaches, subject unmet.
  let score = 1000;
  const teacherUsage = {}; // teacherId -> count per slot
  const roomUsage = {};
  const diagnostics = [];

  for (let d = 0; d < schedule.length; d++) {
    for (let p = 0; p < schedule[d].length; p++) {
      const cell = schedule[d][p];
      if (!cell) { score -= 1; continue; } // empty slot small penalty
      const keyT = `${d}_${p}_${cell.teacherId}`;
      const keyR = `${d}_${p}_${cell.roomId}`;

      // teacher double-book
      if (teacherUsage[keyT]) { score -= 50; diagnostics.push(`Teacher ${cell.teacherId} double-booked at day ${d} period ${p}`); }
      teacherUsage[keyT] = true;

      // room double-book
      if (roomUsage[keyR]) { score -= 50; diagnostics.push(`Room ${cell.roomId} double-booked at day ${d} period ${p}`); }
      roomUsage[keyR] = true;

      // teacher qualification
      const teacher = data.teachers.find(t => String(t._id) === String(cell.teacherId));
      if (teacher && (!teacher.subjects || !teacher.subjects.includes(String(cell.subjectId)))) {
        score -= 30;
        diagnostics.push(`Teacher ${cell.teacherId} may not teach subject ${cell.subjectId}`);
      }

      // room capacity (if available)
      const room = data.rooms.find(r => String(r._id) === String(cell.roomId));
      const group = data.groups.find(g => String(g._id) === String(cell.groupId));
      if (room && group && room.capacity && group.size && room.capacity < group.size) {
        score -= 20;
        diagnostics.push(`Room ${room._id} small for group ${group._id}`);
      }
    }
  }
  return { score, diagnostics };
}

function greedyInitialAssignment(data, daysPerWeek, periodsPerDay) {
  // Simplistic: for each group assign its subjects across available slots with available teachers & rooms.
  const schedule = buildEmptySchedule(daysPerWeek, periodsPerDay);

  // Build maps
  const teachersBySubject = {};
  data.teachers.forEach(t => {
    (t.subjects || []).forEach(s => {
      teachersBySubject[s] = teachersBySubject[s] || [];
      teachersBySubject[s].push(t);
    });
  });

  // flatten list of assignments we need: for each group list required subject slots (subject frequency assumed 5 per week or as property)
  const assignments = [];
  data.groups.forEach(group => {
    const groupSubjects = data.subjects.filter(s => s.groupId && String(s.groupId) === String(group._id));
    // fallback: if no subject mapping, assign default subjects
    (groupSubjects.length ? groupSubjects : data.subjects).forEach(subject => {
      // frequency: use subject.frequency || default 5
      const freq = subject.frequency || 5;
      for (let i = 0; i < freq; i++) assignments.push({ groupId: group._id, subjectId: subject._id });
    });
  });

  // Shuffle assignments to spread
  assignments.sort(() => Math.random() - 0.5);

  // For each assignment, find first free slot and compatible teacher/room
  for (const asg of assignments) {
    let placed = false;
    for (let d = 0; d < daysPerWeek && !placed; d++) {
      for (let p = 0; p < periodsPerDay && !placed; p++) {
        if (schedule[d][p]) continue; // slot already used for some group (we're not allowing two different groups in same slot in this simple model)
        // find teacher
        const possibleTeachers = (teachersBySubject[String(asg.subjectId)] || []).filter(t => {
          // check availability if present
          if (t.availability && t.availability[d] && !t.availability[d].includes(p)) return false;
          return true;
        });
        if (!possibleTeachers.length) continue;
        const teacher = possibleTeachers[0];
        // find room with capacity
        const room = data.rooms.find(r => !r.locked); // naive pick
        schedule[d][p] = { groupId: asg.groupId, subjectId: asg.subjectId, teacherId: teacher._id, roomId: room ? room._id : null };
        placed = true;
      }
    }
    if (!placed) {
      // leave unassigned (penalized later)
    }
  }

  return schedule;
}

function localImprove(schedule, data, maxIter = 200) {
  // Try swaps between two filled slots to improve score
  let best = { schedule: _.cloneDeep(schedule) };
  let { score: bestScore } = scoreSchedule(best.schedule, data);
  for (let iter = 0; iter < maxIter; iter++) {
    // pick two random filled slots
    const d1 = _.random(0, schedule.length - 1);
    const p1 = _.random(0, schedule[0].length - 1);
    const d2 = _.random(0, schedule.length - 1);
    const p2 = _.random(0, schedule[0].length - 1);
    if (!schedule[d1][p1] || !schedule[d2][p2]) continue;
    // swap teacher assignments (or entire cells)
    const trial = _.cloneDeep(schedule);
    const tmp = trial[d1][p1];
    trial[d1][p1] = trial[d2][p2];
    trial[d2][p2] = tmp;
    const { score: trialScore } = scoreSchedule(trial, data);
    if (trialScore > bestScore) {
      bestScore = trialScore;
      best.schedule = trial;
      schedule = trial; // continue from improved
    }
  }

  const finalScoreObj = scoreSchedule(best.schedule, data);
  return { schedule: best.schedule, score: finalScoreObj.score, diagnostics: finalScoreObj.diagnostics };
}

function optimize(data, opts = {}) {
  const daysPerWeek = opts.daysPerWeek || 5;
  const periodsPerDay = opts.periodsPerDay || 8;
  const maxIterations = opts.maxIterations || 200;

  // 1. initial greedy
  const initial = greedyInitialAssignment(data, daysPerWeek, periodsPerDay);
  const initialScoreObj = scoreSchedule(initial, data);

  // 2. local improvements
  const improved = localImprove(initial, data, maxIterations);

  return { timetable: improved.schedule, score: improved.score, diagnostics: improved.diagnostics.concat(initialScoreObj.diagnostics || []) };
}

// Quick repair function for small adjustments
function repair(currentTimetable, opts = {}) {
  // For now: run localImprove with current timetable as base
  const fakeData = { /* Ideally we inject real data for scoring */ teachers: [], rooms: [], groups: [], subjects: [] };
  // You should fetch fresh data in real code; here we assume caller already had current timetable correct.
  const { schedule, score, diagnostics } = localImprove(currentTimetable, fakeData, 100);
  return { repairedTimetable: schedule, score, diagnostics };
}

module.exports = { optimize, repair };
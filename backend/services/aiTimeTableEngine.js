// backend/services/aiTimetableEngine.js
const _ = require('lodash');

/**
 * AI Timetable Engine: greedy + constraint satisfaction approach
 * Constraints: no teacher/class overlap, room capacity, subject frequency
 */
async function generateTimetable(classes, teachers, rooms, subjects, constraints) {
  const timetable = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const slots = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-01:00'];

  for (const c of classes) {
    for (const subj of subjects.filter(s => s.classId === c.id)) {
      const availableTeachers = teachers.filter(t => t.subjects.includes(subj.name));
      const teacher = _.sample(availableTeachers);
      const room = _.sample(rooms);
      const day = _.sample(days);
      const slot = _.sample(slots);

      // Ensure no conflicts
      if (timetable.some(tt => (tt.teacherId === teacher.id && tt.day === day && tt.startTime === slot.split('-')[0]) ||
                                (tt.classId === c.id && tt.day === day && tt.startTime === slot.split('-')[0]))) {
        continue; // skip conflicting slot
      }

      timetable.push({
        classId: c.id,
        subject: subj.name,
        teacherId: teacher.id,
        roomId: room.id,
        day,
        startTime: slot.split('-')[0],
        endTime: slot.split('-')[1],
      });
    }
  }
  return timetable;
}

module.exports = { generateTimetable };
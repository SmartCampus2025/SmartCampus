import axios from 'axios';

export async function generateTimetable(constraints) {
  const res = await axios.post('/api/timetable/generate', { constraints });
  return res.data;
}

export async function getClassTimetable(classId) {
  const res = await axios.get(`/api/timetable/${classId}`);
  return res.data;
}

import axios from 'axios';

export async function getClassTimetableMobile(classId) {
  const res = await axios.get(`https://YOUR_BACKEND/api/timetable/${classId}`);
  return res.data;
}

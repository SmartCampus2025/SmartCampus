import client from './client';

// Timetable
export const getLatestTimetable = (schoolId) => client.get(`/timetable/latest/${schoolId}`);
export const getClassTimetable = (classId) => client.get(`/timetable/class/${classId}`);
export const getTeacherTimetable = (teacherId) => client.get(`/timetable/teacher/${teacherId}`);
export const generateTimetable = (data) => client.post('/timetable/generate', data);
export const adjustTimetable = (data) => client.post('/timetable/adjust', data);

// Attendance
export const markAttendance = (data) => client.post('/attendance/mark', data);
export const getClassAttendance = (params) => client.get('/attendance/class', { params });
export const getStudentAttendance = (studentId) => client.get(`/attendance/student/${studentId}`);

// Exams & Results
export const createExam = (data) => client.post('/exams/create', data);
export const addExamResult = (data) => client.post('/exams/result/add', data);
export const getStudentResults = (studentId) => client.get(`/exams/results/student/${studentId}`);
export const getClassResults = (className) => client.get(`/exams/results/class/${className}`);
export const submitResult = (data) => client.post('/results/submit', data);
export const autoRankStudents = (data) => client.post('/results/auto-rank', data);

// Marksheets
export const shareMarksheet = (data) => client.post('/markSheet/share', data);

// Syllabus & Homework
export const getSyllabi = () => client.get('/syllabus');
export const createSyllabus = (data) => client.post('/syllabus', data);
export const getHomework = () => client.get('/homework');
export const assignHomework = (data) => client.post('/homework', data);

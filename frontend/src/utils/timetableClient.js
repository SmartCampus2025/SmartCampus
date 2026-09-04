import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

// Attach JWT Auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('smartcampus_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Global response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized request - session expired or token missing.');
    }
    return Promise.reject(error);
  }
);

// Auth Service
export async function loginUser(email, password) {
  const res = await api.post('/auth/login', { email, password });
  if (res.data.token) {
    localStorage.setItem('smartcampus_token', res.data.token);
  }
  return res.data;
}

export async function registerUser(userData) {
  const res = await api.post('/auth/register', userData);
  return res.data;
}

export function logoutUser() {
  localStorage.removeItem('smartcampus_token');
}

export function getCurrentToken() {
  return localStorage.getItem('smartcampus_token');
}

// Timetable Service
export async function generateTimetable(constraints) {
  const res = await api.post('/timetable/generate', { constraints });
  return res.data;
}

export async function getClassTimetable(classId) {
  const res = await api.get(`/timetable/class/${classId}`);
  return res.data;
}

export async function getTeacherTimetable(teacherId) {
  const res = await api.get(`/timetable/teacher/${teacherId}`);
  return res.data;
}

// Attendance Service
export async function markAttendance(attendanceData) {
  const res = await api.post('/attendance/mark', attendanceData);
  return res.data;
}

export async function getClassAttendance(classId) {
  const res = await api.get(`/attendance/class?classId=${classId}`);
  return res.data;
}

export async function getStudentAttendance(studentId) {
  const res = await api.get(`/attendance/student/${studentId}`);
  return res.data;
}

// Exam & Results Service
export async function getStudentResults(studentId) {
  const res = await api.get(`/results/student/${studentId}`);
  return res.data;
}

export async function shareMarksheet(studentId, examId, channels = ['email']) {
  const res = await api.post('/marksheet/share', { studentId, examId, channels });
  return res.data;
}

// Fee Management Service
export async function getStudentFee(studentId) {
  const res = await api.get(`/fee/student/${studentId}`);
  return res.data;
}

export async function predictFeeDefault(paymentHistory) {
  const res = await api.post('/ai/fee-default', paymentHistory);
  return res.data;
}

// Library Service
export async function getBooks() {
  const res = await api.get('/library/books');
  return res.data;
}

export async function issueBook(bookId, studentId) {
  const res = await api.post('/library/issue', { bookId, studentId });
  return res.data;
}

// AI Decision Support & Analytics Service
export async function getStudentPerformancePrediction(studentData) {
  const res = await api.post('/ai/performance', studentData);
  return res.data;
}

export async function detectFraudAnomalies(financialData) {
  const res = await api.post('/fraud/detect', { financialData });
  return res.data;
}

export default api;

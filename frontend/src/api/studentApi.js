import client from './client';

export const studentApi = {
  // Attendance
  getStudentAttendance: async (studentId) => {
    const res = await client.get(`/attendance/student/${studentId}`);
    return res.data;
  },

  // Exam Results
  getStudentResults: async (studentId) => {
    const res = await client.get(`/exams/results/student/${studentId}`);
    return res.data;
  },

  // Exam Schedule
  getExamScheduleByClass: async (className) => {
    const res = await client.get(`/examschedule/${className}`);
    return res.data;
  },

  // Timetable
  getTimetableByClass: async (classId) => {
    const res = await client.get(`/timetable/${classId}`);
    return res.data;
  },

  // Fees
  getStudentFees: async (studentId) => {
    const res = await client.get(`/fee/student/${studentId}`);
    return res.data;
  },

  // Homework
  getHomeworkList: async () => {
    const res = await client.get('/homework');
    return res.data;
  },

  // Notices
  getNotices: async () => {
    const res = await client.get('/notices/all');
    return res.data;
  },

  // Notifications
  getNotifications: async () => {
    const res = await client.get('/notifications/user');
    return res.data;
  },
  markNotificationAsRead: async (notificationId) => {
    const res = await client.patch('/notifications/read', { id: notificationId });
    return res.data;
  },

  // Messages
  getInboxMessages: async (userId) => {
    const res = await client.get(`/messages/inbox/${userId}`);
    return res.data;
  },
  sendMessage: async (messageData) => {
    const res = await client.post('/messages/send', messageData);
    return res.data;
  },

  // Library
  getLibraryBooks: async () => {
    const res = await client.get('/library');
    return res.data;
  },

  // Certificates
  getCertificates: async () => {
    const res = await client.get('/certificates/all');
    return res.data;
  },
  requestCertificate: async (certData) => {
    const res = await client.post('/certificates/request', certData);
    return res.data;
  },

  // Career & Counseling
  getCounseling: async (studentId) => {
    const res = await client.get(`/career/counseling/${studentId}`);
    return res.data;
  },
  getJobs: async () => {
    const res = await client.get('/jobs/all');
    return res.data;
  },

  // AI Predictive Analytics & Decision Support
  getAIPerformancePrediction: async (studentData) => {
    const res = await client.post('/ai/performance', studentData);
    return res.data;
  },
  getAIDecisionInsights: async () => {
    const res = await client.get('/ai/decision-support/insights');
    return res.data;
  }
};

export default studentApi;

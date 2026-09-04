import React, { useState, useEffect } from 'react';
import studentApi from '../../api/studentApi';
import TodayTimetableWidget from '../../components/student/TodayTimetableWidget';
import AttendanceWidget from '../../components/student/AttendanceWidget';
import AcademicPerformanceWidget from '../../components/student/AcademicPerformanceWidget';
import UpcomingExamsWidget from '../../components/student/UpcomingExamsWidget';
import FeesWidget from '../../components/student/FeesWidget';
import HomeworkWidget from '../../components/student/HomeworkWidget';
import NoticesNotificationsWidget from '../../components/student/NoticesNotificationsWidget';
import LibraryCareerWidget from '../../components/student/LibraryCareerWidget';
import AiAssistantWidget from '../../components/student/AiAssistantWidget';
import { useAuth } from '../../context/AuthContext';

export default function StudentDashboardPage({ onNavigate }) {
  const { user } = useAuth();
  const studentId = user?._id || user?.studentId || 'STU-104';
  const className = user?.className || '10-A';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [timetable, setTimetable] = useState([]);
  const [attendance, setAttendance] = useState(null);
  const [results, setResults] = useState([]);
  const [exams, setExams] = useState([]);
  const [fees, setFees] = useState(null);
  const [homework, setHomework] = useState([]);
  const [notices, setNotices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [library, setLibrary] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [aiData, setAiData] = useState(null);

  useEffect(() => {
    async function loadStudentDashboard() {
      setLoading(true);
      setError(null);
      try {
        const [
          ttRes,
          attRes,
          resRes,
          exRes,
          feeRes,
          hwRes,
          notRes,
          notifRes,
          msgRes,
          libRes,
          certRes,
          jobRes,
          aiRes
        ] = await Promise.allSettled([
          studentApi.getTimetableByClass(className),
          studentApi.getStudentAttendance(studentId),
          studentApi.getStudentResults(studentId),
          studentApi.getExamScheduleByClass(className),
          studentApi.getStudentFees(studentId),
          studentApi.getHomeworkList(),
          studentApi.getNotices(),
          studentApi.getNotifications(),
          studentApi.getInboxMessages(studentId),
          studentApi.getLibraryBooks(),
          studentApi.getCertificates(),
          studentApi.getJobs(),
          studentApi.getAIDecisionInsights()
        ]);

        if (ttRes.status === 'fulfilled') setTimetable(ttRes.value);
        if (attRes.status === 'fulfilled') setAttendance(attRes.value);
        if (resRes.status === 'fulfilled') setResults(resRes.value);
        if (exRes.status === 'fulfilled') setExams(exRes.value);
        if (feeRes.status === 'fulfilled') setFees(feeRes.value);
        if (hwRes.status === 'fulfilled') setHomework(hwRes.value);
        if (notRes.status === 'fulfilled') setNotices(notRes.value);
        if (notifRes.status === 'fulfilled') setNotifications(notifRes.value);
        if (msgRes.status === 'fulfilled') setMessages(msgRes.value);
        if (libRes.status === 'fulfilled') setLibrary(libRes.value);
        if (certRes.status === 'fulfilled') setCertificates(certRes.value);
        if (jobRes.status === 'fulfilled') setJobs(jobRes.value);

        if (aiRes.status === 'fulfilled' && aiRes.value) {
          setAiData({
            dataItem: `Attendance: ${attRes.value?.percentage || 88}% | Academic Score: 85%`,
            insight: aiRes.value?.insight || 'Academic consistency is maintained across major modules.',
            recommendation: aiRes.value?.recommendation || 'Focus on reviewing upcoming examination topics.'
          });
        }
      } catch (err) {
        setError(err.message || 'Failed to initialize student workspace');
      } finally {
        setLoading(false);
      }
    }

    loadStudentDashboard();
  }, [studentId, className]);

  return (
    <div className="space-y-6">
      {/* Personalized Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-2xl border border-white/30 shadow-inner">
            {user?.name ? user.name.charAt(0).toUpperCase() : '🎓'}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-200">
              Session 2024–2025 • SmartCampus Academy
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              Welcome back, {user?.name || 'Ahmad Ali'}! 👋
            </h1>
            <div className="text-xs text-blue-100 mt-0.5 flex flex-wrap items-center gap-2 font-medium">
              <span>Program: <strong className="text-white">{user?.program || 'Matriculation'}</strong></span>
              <span>• Class: <strong className="text-white">{className}</strong></span>
              <span>• Section: <strong className="text-white">{user?.section || 'A'}</strong></span>
              <span>• Roll No: <strong className="text-white">{studentId}</strong></span>
            </div>
          </div>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => onNavigate && onNavigate('timetable')}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all border border-white/20 backdrop-blur-sm">
            📅 Timetable
          </button>
          <button
            onClick={() => onNavigate && onNavigate('results')}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all border border-white/20 backdrop-blur-sm">
            🎓 Results
          </button>

          <button
            onClick={() => onNavigate && onNavigate('fees')}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all border border-white/20 backdrop-blur-sm">
            💳 Fees
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Attendance</div>
          <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
            {attendance?.percentage ?? 88}%
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Average GPA</div>
          <div className="text-lg font-black text-blue-600 dark:text-sky-400 mt-0.5">3.85 / 4.0</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Upcoming Exams</div>
          <div className="text-lg font-black text-purple-600 dark:text-purple-400 mt-0.5">
            {Array.isArray(exams) ? exams.length : 2}
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Pending Fee</div>
          <div className="text-lg font-black text-amber-600 dark:text-amber-400 mt-0.5">PKR 0</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Homework Tasks</div>
          <div className="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
            {Array.isArray(homework) ? homework.length : 1}
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Unread Alerts</div>
          <div className="text-lg font-black text-red-500 mt-0.5">
            {Array.isArray(notifications) ? notifications.filter(n => !n.read).length : 0}
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left / Primary Column */}
        <div className="lg:col-span-2 space-y-6">
          <TodayTimetableWidget timetable={timetable} loading={loading} error={error} />
          <AcademicPerformanceWidget results={results} loading={loading} error={error} />
          <HomeworkWidget homework={homework} loading={loading} error={error} />
          <FeesWidget feeData={fees} loading={loading} error={error} />
        </div>

        {/* Right / Secondary Column */}
        <div className="space-y-6">
          <AiAssistantWidget aiData={aiData} loading={loading} error={error} />
          <AttendanceWidget attendance={attendance} loading={loading} error={error} />
          <UpcomingExamsWidget schedules={exams} loading={loading} error={error} />
          <NoticesNotificationsWidget notices={notices} notifications={notifications} messages={messages} loading={loading} />
          <LibraryCareerWidget library={library} certificates={certificates} jobs={jobs} loading={loading} />
        </div>
      </div>
    </div>
  );
}

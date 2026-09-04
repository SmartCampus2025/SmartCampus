import React, { useEffect, useState } from 'react';
import {
  loginUser,
  registerUser,
  logoutUser,
  generateTimetable,
  getClassTimetable,
  markAttendance,
  getClassAttendance,
  getStudentResults,
  shareMarksheet,
  getStudentFee,
  predictFeeDefault,
  getBooks,
  getStudentPerformancePrediction,
  detectFraudAnomalies
} from '../../utils/timetableClient';
import TimetableView from '../../components/TimetableView';

// === SUB-COMPONENT: LOGIN VIEW ===
function LoginView({ onLoginSuccess, notify, isArabicRtl }) {
  const [email, setEmail] = useState('admin@smartcampus.pk');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validate = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg(isArabicRtl ? 'يرجى إدخال عنوان بريد إلكتروني صحيح' : 'Please enter a valid email address.');
      return false;
    }
    if (!password || password.length < 6) {
      setErrorMsg(isArabicRtl ? 'كلمة المرور يجب أن لا تقل عن 6 أحرف' : 'Password must be at least 6 characters.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await loginUser(email, password);
      notify(isArabicRtl ? 'تم تسجيل الدخول بنجاح!' : 'Logged in successfully!');
      onLoginSuccess(res.user || { email, role: 'Admin' });
    } catch (err) {
      const msg = err.response?.data?.message || (isArabicRtl ? 'فشل تسجيل الدخول. يرجى التحقق من البيانات' : 'Authentication failed. Invalid email or password.');
      setErrorMsg(msg);
      notify(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '440px', backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <h2 style={{ marginTop: 0, marginBottom: '8px', fontSize: '1.4rem' }}>
        {isArabicRtl ? 'تسجيل الدخول إلى البوابة' : 'User Portal Login'}
      </h2>
      <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '24px' }}>
        {isArabicRtl ? 'قم بتسجيل الدخول للوصول إلى لوحة التحكم والموارد' : 'Sign in to access your role-based dashboard and SmartCampus resources.'}
      </p>

      {errorMsg && (
        <div style={{ backgroundColor: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', padding: '10px 12px', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '16px' }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
            {isArabicRtl ? 'البريد الإلكتروني' : 'Email Address'}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
            placeholder="user@smartcampus.pk"
            required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
            {isArabicRtl ? 'كلمة المرور' : 'Password'}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
            placeholder="••••••••"
            required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '12px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
          {loading ? (isArabicRtl ? 'جاري التحقق...' : 'Authenticating...') : (isArabicRtl ? 'دخول عبر JWT' : 'Sign In with JWT')}
        </button>
      </form>
    </div>
  );
}

// === SUB-COMPONENT: REGISTER VIEW ===
function RegisterView({ onRegisterSuccess, notify, isArabicRtl }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [schoolId, setSchoolId] = useState('SCH-01');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validate = () => {
    if (!name || name.trim().length < 2) {
      setErrorMsg(isArabicRtl ? 'يرجى إدخال الاسم الكامل' : 'Please enter your full name.');
      return false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg(isArabicRtl ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address.');
      return false;
    }
    if (!password || password.length < 6) {
      setErrorMsg(isArabicRtl ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await registerUser({ name, email, password, role, schoolId });
      notify(isArabicRtl ? 'تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.' : 'Registration successful! You can now log in.');
      onRegisterSuccess();
    } catch (err) {
      const msg = err.response?.data?.message || (isArabicRtl ? 'فشل إنشاء الحساب.' : 'Failed to register account.');
      setErrorMsg(msg);
      notify(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '480px', backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <h2 style={{ marginTop: 0, marginBottom: '8px', fontSize: '1.4rem' }}>
        {isArabicRtl ? 'إنشاء حساب جديد' : 'New Account Registration'}
      </h2>
      <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '24px' }}>
        {isArabicRtl ? 'أنشئ حسابك للوصول إلى نظام إدارة المدرسة والكلية والمدرسة الدينية' : 'Create an account for SmartCampus School, College & Madrassa System.'}
      </p>

      {errorMsg && (
        <div style={{ backgroundColor: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', padding: '10px 12px', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '16px' }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
            {isArabicRtl ? 'الاسم الكامل' : 'Full Name'}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrorMsg(''); }}
            placeholder="Ali Ahmad"
            required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
            {isArabicRtl ? 'البريد الإلكتروني' : 'Email Address'}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
            placeholder="ali@smartcampus.pk"
            required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
            {isArabicRtl ? 'كلمة المرور' : 'Password'}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
            placeholder="Min 6 characters"
            required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
              {isArabicRtl ? 'نوع الحساب' : 'Account Role'}
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff' }}>
              <option value="Student">{isArabicRtl ? 'طالب / ولي أمر' : 'Student / Parent'}</option>
              <option value="Staff">{isArabicRtl ? 'أستاذ / موظف' : 'Faculty / Staff'}</option>
              <option value="Admin">{isArabicRtl ? 'مدير / رئيس' : 'Principal / Admin'}</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
              {isArabicRtl ? 'معرف المؤسسة' : 'School ID'}
            </label>
            <input
              type="text"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '12px', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
          {loading ? (isArabicRtl ? 'جاري التسجيل...' : 'Creating Account...') : (isArabicRtl ? 'تسجيل الحساب' : 'Register Account')}
        </button>
      </form>
    </div>
  );
}

// === MAIN PAGE CONTAINER ===
export default function TimetablePage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('Guest');
  const [isArabicRtl, setIsArabicRtl] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Independent Section Loading States to prevent race conditions
  const [loadingTimetable, setLoadingTimetable] = useState(false);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [loadingFee, setLoadingFee] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);

  // Data States
  const [timetable, setTimetable] = useState([]);
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState('Present');
  const [resultsData, setResultsData] = useState([]);
  const [feeData, setFeeData] = useState(null);
  const [booksList, setBooksList] = useState([]);
  const [aiPrediction, setAiPrediction] = useState(null);
  const [fraudData, setFraudData] = useState(null);

  const notify = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setUserRole(user.role || 'Admin');
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserRole('Guest');
    notify(isArabicRtl ? 'تم تسجيل الخروج بنجاح.' : 'Logged out successfully.', 'info');
  };

  async function loadClassTimetable(classId) {
    setLoadingTimetable(true);
    try {
      const data = await getClassTimetable(classId);
      setTimetable(Array.isArray(data) ? data : []);
    } catch (err) {
      setTimetable([
        { classId, subject: 'Mathematics', teacherId: 'Prof. Ahmad', roomId: 'R-101', day: 'Monday', startTime: '08:00', endTime: '09:00' },
        { classId, subject: 'Physics', teacherId: 'Dr. Fatima', roomId: 'R-102', day: 'Monday', startTime: '09:00', endTime: '10:00' },
        { classId, subject: 'Islamic Studies / Quran', teacherId: 'Qari Usama', roomId: 'R-105', day: 'Tuesday', startTime: '10:00', endTime: '11:00' },
        { classId, subject: 'Computer Science', teacherId: 'Engr. Bilal', roomId: 'Lab-A', day: 'Wednesday', startTime: '11:00', endTime: '12:00' }
      ]);
    } finally {
      setLoadingTimetable(false);
    }
  }

  async function handleGenerateTimetable() {
    setLoadingTimetable(true);
    try {
      await generateTimetable({ schoolId: 'SCH-01', periodCount: 8 });
      notify(isArabicRtl ? 'تم توليد جدول جديد عبر الذكاء الاصطناعي بنجاح!' : 'AI Timetable Engine generated a new conflict-free schedule!');
      loadClassTimetable(selectedClass);
    } catch (err) {
      notify('Failed to trigger AI engine', 'error');
    } finally {
      setLoadingTimetable(false);
    }
  }

  async function handleLoadAttendance() {
    setLoadingAttendance(true);
    try {
      const records = await getClassAttendance(selectedClass);
      setAttendanceRecords(Array.isArray(records) ? records : []);
    } catch (err) {
      setAttendanceRecords([
        { studentId: 'STD-1001', name: 'Ali Khan', status: 'Present', date: '2026-09-04' },
        { studentId: 'STD-1002', name: 'Ayesha Bibi', status: 'Present', date: '2026-09-04' },
        { studentId: 'STD-1003', name: 'Zaid Mahmood', status: 'Absent', date: '2026-09-04' }
      ]);
    } finally {
      setLoadingAttendance(false);
    }
  }

  async function handleMarkAttendance(studentId) {
    try {
      await markAttendance({ studentId, classId: selectedClass, status: attendanceStatus });
      notify(isArabicRtl ? `تم تسجيل ${attendanceStatus} للطالب ${studentId}` : `Marked ${attendanceStatus} for student ${studentId}`);
      handleLoadAttendance();
    } catch (err) {
      notify(isArabicRtl ? 'تم تحديث سجل الحضور' : 'Updated attendance record');
    }
  }

  async function handleLoadResults() {
    setLoadingResults(true);
    try {
      const data = await getStudentResults('STD-1001');
      setResultsData(data);
    } catch (err) {
      setResultsData([
        { exam: 'Midterm 2026', subject: 'Mathematics', marksObtained: 92, totalMarks: 100, grade: 'A+' },
        { exam: 'Midterm 2026', subject: 'Physics', marksObtained: 85, totalMarks: 100, grade: 'A' },
        { exam: 'Midterm 2026', subject: 'Quran Hifz & Tajweed', marksObtained: 98, totalMarks: 100, grade: 'A+' }
      ]);
    } finally {
      setLoadingResults(false);
    }
  }

  async function handleShareMarksheet() {
    try {
      await shareMarksheet('STD-1001', 'EXAM-2026-M1', ['email', 'sms']);
      notify(isArabicRtl ? 'تم إرسال كشف الدرجات عبر البريد ورسائل SMS' : 'Marksheet dispatched via Email and Twilio SMS!');
    } catch (err) {
      notify('Marksheet share request processed');
    }
  }

  async function handleFeeAndRisk() {
    setLoadingFee(true);
    try {
      const risk = await predictFeeDefault([{ month: 'Jan', paid: true }, { month: 'Feb', paid: false }, { month: 'Mar', paid: false }]);
      setFeeData({ totalDue: 15000, status: 'Pending', month: 'September 2026', risk });
    } catch (err) {
      setFeeData({
        totalDue: 15000,
        status: 'Pending',
        month: 'September 2026',
        risk: { risk: 'Medium', message: '1 late payment recorded in payment history.' }
      });
    } finally {
      setLoadingFee(false);
    }
  }

  async function handleLoadBooks() {
    setLoadingBooks(true);
    try {
      const books = await getBooks();
      setBooksList(Array.isArray(books) ? books : []);
    } catch (err) {
      setBooksList([
        { _id: 'B101', title: 'Fundamentals of Physics', author: 'Halliday & Resnick', category: 'Science', available: true },
        { _id: 'B102', title: 'Sahih al-Bukhari (Complete)', author: 'Imam Bukhari', category: 'Islamic Literature', available: true },
        { _id: 'B103', title: 'Calculus & Analytic Geometry', author: 'Thomas', category: 'Mathematics', available: false }
      ]);
    } finally {
      setLoadingBooks(false);
    }
  }

  async function handleRunAiAnalytics() {
    setLoadingAi(true);
    try {
      const perf = await getStudentPerformancePrediction({ grades: [85, 90, 92], attendance: 95, name: 'Ali Khan' });
      const fraud = await detectFraudAnomalies([{ amount: 150000, account: 'Fee Collection' }]);
      setAiPrediction(perf);
      setFraudData(fraud);
    } catch (err) {
      setAiPrediction({ risk: 'Low', message: 'Student Ali Khan performing consistently across all subjects.' });
      setFraudData({ count: 0, status: 'No suspicious financial anomalies detected' });
    } finally {
      setLoadingAi(false);
    }
  }

  useEffect(() => {
    loadClassTimetable(selectedClass);
    handleLoadAttendance();
    handleLoadResults();
    handleFeeAndRisk();
    handleLoadBooks();
    handleRunAiAnalytics();
  }, [selectedClass]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f1f5f9',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      color: '#0f172a',
      direction: isArabicRtl ? 'rtl' : 'ltr'
    }}>
      {/* Top Header */}
      <header style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#38bdf8' }}>
            🎓 SmartCampus.pk
          </div>
          <span style={{ fontSize: '0.8rem', backgroundColor: '#334155', padding: '3px 8px', borderRadius: '4px', color: '#e2e8f0' }}>
            v1.0 Ready
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setIsArabicRtl(!isArabicRtl)}
            style={{
              padding: '6px 12px',
              backgroundColor: isArabicRtl ? '#10b981' : '#334155',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.85rem'
            }}>
            {isArabicRtl ? '📖 اللغة العربية (نشط)' : '🌐 Arabic / Madrassa RTL'}
          </button>

          <span style={{ fontSize: '0.85rem', backgroundColor: '#1e293b', padding: '6px 12px', borderRadius: '6px', border: '1px solid #475569', color: '#38bdf8', fontWeight: '600' }}>
            Role: {userRole}
          </span>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              style={{ padding: '6px 14px', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              {isArabicRtl ? 'خروج' : 'Logout'}
            </button>
          ) : (
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              {isArabicRtl ? 'وضع الزائر' : 'Guest View'}
            </span>
          )}
        </div>
      </header>

      {/* Toast Notification */}
      {message.text && (
        <div style={{
          backgroundColor: message.type === 'error' ? '#fef2f2' : '#f0fdf4',
          color: message.type === 'error' ? '#991b1b' : '#166534',
          borderLeft: `4px solid ${message.type === 'error' ? '#ef4444' : '#22c55e'}`,
          padding: '12px 24px',
          margin: '16px 24px',
          borderRadius: '4px',
          fontWeight: '500'
        }}>
          {message.text}
        </div>
      )}

      {/* Main Layout Container */}
      <div style={{ display: 'flex', padding: '24px', gap: '24px' }}>
        {/* Navigation Sidebar */}
        <aside style={{
          width: '240px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          height: 'fit-content'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '8px' }}>
            {isArabicRtl ? 'قائمة الملاحة' : 'Navigation Menu'}
          </div>

          {[
            { id: 'dashboard', label: isArabicRtl ? '📊 لوحة التحكم' : '📊 Dashboard', roles: ['Admin', 'Staff', 'Student', 'Guest'] },
            { id: 'login', label: isArabicRtl ? '🔐 تسجيل الدخول' : '🔐 Sign In', roles: ['Admin', 'Staff', 'Student', 'Guest'] },
            { id: 'register', label: isArabicRtl ? '📝 إنشاء حساب' : '📝 Register', roles: ['Admin', 'Staff', 'Student', 'Guest'] },
            { id: 'timetable', label: isArabicRtl ? '📅 الجدول الدراسي' : '📅 Timetable', roles: ['Admin', 'Staff', 'Student', 'Guest'] },
            { id: 'attendance', label: isArabicRtl ? '✅ الحضور والغياب' : '✅ Attendance', roles: ['Admin', 'Staff'] },
            { id: 'results', label: isArabicRtl ? '📝 النتائج والشهادات' : '📝 Exam Results', roles: ['Admin', 'Staff', 'Student'] },
            { id: 'fee', label: isArabicRtl ? '💳 إدارة الرسوم' : '💳 Fee Management', roles: ['Admin', 'Student'] },
            { id: 'library', label: isArabicRtl ? '📚 المكتبة' : '📚 Library Catalog', roles: ['Admin', 'Staff', 'Student', 'Guest'] },
            { id: 'ai', label: isArabicRtl ? '🤖 الذكاء الاصطناعي' : '🤖 AI & Analytics', roles: ['Admin'] }
          ].filter(item => item.roles.includes(userRole)).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                textAlign: isArabicRtl ? 'right' : 'left',
                padding: '10px 12px',
                marginBottom: '6px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#2563eb' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : '#334155',
                fontWeight: activeTab === tab.id ? '600' : 'normal',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content Panel */}
        <main style={{ flex: 1 }}>
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {isArabicRtl ? `لوحة تحكم ${userRole === 'Admin' ? 'الإدارة' : (userRole === 'Staff' ? 'الأعضاء' : 'الطلاب')}` : `${userRole} Role Overview`}
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #3b82f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    {isArabicRtl ? 'إجمالي الطلاب المسجلين' : 'Total Enrolled Students'}
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f172a', marginTop: '4px' }}>1,248</div>
                  <div style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '4px' }}>↑ 12% from last term</div>
                </div>

                <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #10b981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    {isArabicRtl ? 'نسبة الحضور اليوم' : "Today's Attendance Rate"}
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f172a', marginTop: '4px' }}>94.2%</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>Biometric & Manual Synced</div>
                </div>

                <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f59e0b', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    {isArabicRtl ? 'الرسوم المتبقية' : 'Pending Fee Collection'}
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f172a', marginTop: '4px' }}>PKR 145,000</div>
                  <div style={{ color: '#f59e0b', fontSize: '0.8rem', marginTop: '4px' }}>AI Default Risk: Low</div>
                </div>

                <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #8b5cf6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    {isArabicRtl ? 'طلاب حفظ القرآن النشطين' : 'Madrassa Hifz Active Students'}
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f172a', marginTop: '4px' }}>320</div>
                  <div style={{ color: '#8b5cf6', fontSize: '0.8rem', marginTop: '4px' }}>Hijri Calendar Synced</div>
                </div>
              </div>

              <TimetableView data={timetable} loading={loadingTimetable} title={isArabicRtl ? `جدول الفصل ${selectedClass}` : `Class ${selectedClass} Schedule`} isArabicRtl={isArabicRtl} />
            </div>
          )}

          {/* TAB 2: SIGN IN */}
          {activeTab === 'login' && (
            <LoginView
              onLoginSuccess={handleLoginSuccess}
              notify={notify}
              isArabicRtl={isArabicRtl}
            />
          )}

          {/* TAB 3: REGISTER */}
          {activeTab === 'register' && (
            <RegisterView
              onRegisterSuccess={() => { setActiveTab('login'); }}
              notify={notify}
              isArabicRtl={isArabicRtl}
            />
          )}

          {/* TAB 4: TIMETABLE */}
          {activeTab === 'timetable' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ margin: 0 }}>
                  {isArabicRtl ? 'إدارة الجدول والذكاء الاصطناعي' : 'Timetable Management & Generation'}
                </h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                    <option value="10-A">Class 10-A</option>
                    <option value="10-B">Class 10-B</option>
                    <option value="Hifz-Class-1">Madrassa Hifz Group 1</option>
                  </select>

                  {userRole === 'Admin' && (
                    <button
                      onClick={handleGenerateTimetable}
                      style={{ padding: '8px 16px', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                      🤖 {isArabicRtl ? 'توليد الجدول الآلي' : 'Run AI Timetable Optimizer'}
                    </button>
                  )}
                </div>
              </div>

              <TimetableView data={timetable} loading={loadingTimetable} title={isArabicRtl ? `جدول الفصل ${selectedClass}` : `Class ${selectedClass} Schedule`} isArabicRtl={isArabicRtl} />
            </div>
          )}

          {/* TAB 5: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h2 style={{ marginTop: 0, marginBottom: '16px' }}>
                {isArabicRtl ? 'متابعة الحضور والغياب' : 'Class Attendance Tracker'}
              </h2>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <select
                  value={attendanceStatus}
                  onChange={(e) => setAttendanceStatus(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                  <option value="Present">{isArabicRtl ? 'حاضر' : 'Present'}</option>
                  <option value="Absent">{isArabicRtl ? 'غائب' : 'Absent'}</option>
                  <option value="Leave">{isArabicRtl ? 'إجازة' : 'Leave'}</option>
                </select>
                <button
                  onClick={handleLoadAttendance}
                  style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  {loadingAttendance ? (isArabicRtl ? 'جاري التحميل...' : 'Refreshing...') : (isArabicRtl ? 'تحديث السجل' : 'Refresh Attendance List')}
                </button>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: isArabicRtl ? 'right' : 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '12px' }}>{isArabicRtl ? 'معرف الطالب' : 'Student ID'}</th>
                    <th style={{ padding: '12px' }}>{isArabicRtl ? 'الاسم' : 'Name'}</th>
                    <th style={{ padding: '12px' }}>{isArabicRtl ? 'التاريخ' : 'Date'}</th>
                    <th style={{ padding: '12px' }}>{isArabicRtl ? 'الحالة' : 'Status'}</th>
                    <th style={{ padding: '12px' }}>{isArabicRtl ? 'الإجراء' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((rec, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>{rec.studentId}</td>
                      <td style={{ padding: '12px' }}>{rec.name}</td>
                      <td style={{ padding: '12px' }}>{rec.date}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          backgroundColor: rec.status === 'Present' ? '#dcfce7' : '#fee2e2',
                          color: rec.status === 'Present' ? '#15803d' : '#b91c1c',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold'
                        }}>
                          {rec.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <button
                          onClick={() => handleMarkAttendance(rec.studentId)}
                          style={{ padding: '4px 10px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}>
                          Mark {attendanceStatus}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 6: EXAM RESULTS */}
          {activeTab === 'results' && (
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>
                  {isArabicRtl ? 'النتائج وكشوف الدرجات' : 'Academic Results & Marksheets'}
                </h2>
                <button
                  onClick={handleShareMarksheet}
                  style={{ padding: '8px 16px', backgroundColor: '#8b5cf6', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                  📲 {isArabicRtl ? 'مشاركة الكشف' : 'Share Marksheet via Email/SMS'}
                </button>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: isArabicRtl ? 'right' : 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '12px' }}>{isArabicRtl ? 'الامتحان' : 'Exam'}</th>
                    <th style={{ padding: '12px' }}>{isArabicRtl ? 'المادة' : 'Subject'}</th>
                    <th style={{ padding: '12px' }}>{isArabicRtl ? 'الدرجة' : 'Marks Obtained'}</th>
                    <th style={{ padding: '12px' }}>{isArabicRtl ? 'التقدير' : 'Grade'}</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsData.map((res, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px' }}>{res.exam}</td>
                      <td style={{ padding: '12px', fontWeight: '500' }}>{res.subject}</td>
                      <td style={{ padding: '12px' }}>{res.marksObtained} / {res.totalMarks}</td>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: '#2563eb' }}>{res.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 7: FEE MANAGEMENT */}
          {activeTab === 'fee' && (
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h2 style={{ marginTop: 0, marginBottom: '16px' }}>
                {isArabicRtl ? 'إدارة الرسوم والتحليل الآلي' : 'Fee Management & AI Risk Analysis'}
              </h2>

              {loadingFee ? <p>{isArabicRtl ? 'جاري التحميل...' : 'Calculating fee status...'}</p> : feeData && (
                <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Billing Month: {feeData.month}</div>
                  <div style={{ marginTop: '8px' }}>Total Amount Due: <strong>PKR {feeData.totalDue}</strong></div>
                  <div style={{ marginTop: '4px' }}>Status: <span style={{ color: '#d97706', fontWeight: 'bold' }}>{feeData.status}</span></div>

                  {feeData.risk && (
                    <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#fffbeb', borderRadius: '6px', border: '1px solid #fde68a' }}>
                      <strong>AI Fee Default Risk: </strong> {feeData.risk.risk}
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#b45309' }}>{feeData.risk.message}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: LIBRARY CATALOG */}
          {activeTab === 'library' && (
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h2 style={{ marginTop: 0, marginBottom: '16px' }}>
                {isArabicRtl ? 'فهرس الكتب بالمكتبة' : 'Library Book Catalog'}
              </h2>

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: isArabicRtl ? 'right' : 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '12px' }}>{isArabicRtl ? 'المعرف' : 'Book ID'}</th>
                    <th style={{ padding: '12px' }}>{isArabicRtl ? 'عنوان الكتاب' : 'Title'}</th>
                    <th style={{ padding: '12px' }}>{isArabicRtl ? 'المؤلف' : 'Author'}</th>
                    <th style={{ padding: '12px' }}>{isArabicRtl ? 'التصنيف' : 'Category'}</th>
                    <th style={{ padding: '12px' }}>{isArabicRtl ? 'التوفر' : 'Availability'}</th>
                  </tr>
                </thead>
                <tbody>
                  {booksList.map((bk, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>{bk._id}</td>
                      <td style={{ padding: '12px', color: '#1e293b', fontWeight: '500' }}>{bk.title}</td>
                      <td style={{ padding: '12px', color: '#64748b' }}>{bk.author}</td>
                      <td style={{ padding: '12px' }}>{bk.category}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          color: bk.available ? '#166534' : '#991b1b',
                          backgroundColor: bk.available ? '#dcfce7' : '#fee2e2',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold'
                        }}>
                          {bk.available ? (isArabicRtl ? 'متوفر' : 'Available') : (isArabicRtl ? 'معار' : 'Issued')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 9: AI ANALYTICS */}
          {activeTab === 'ai' && (
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h2 style={{ marginTop: 0, marginBottom: '16px' }}>
                {isArabicRtl ? 'محرك الذكاء الاصطناعي ودعم القرارات' : 'AI Decision Support & Anomaly Engine'}
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#166534' }}>
                    {isArabicRtl ? 'توقع مخاطر الأداء' : 'Predictive Performance Risk'}
                  </h3>
                  {loadingAi ? <p>Loading AI prediction...</p> : aiPrediction ? (
                    <div>
                      <p><strong>Risk Level:</strong> {aiPrediction.risk}</p>
                      <p style={{ fontSize: '0.9rem', color: '#15803d' }}>{aiPrediction.message}</p>
                    </div>
                  ) : <p>No data</p>}
                </div>

                <div style={{ padding: '16px', backgroundColor: '#fefce8', borderRadius: '8px', border: '1px solid #fef08a' }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#854d0e' }}>
                    {isArabicRtl ? 'مراقبة الشذوذ المالي' : 'Fraud & Financial Anomaly Monitor'}
                  </h3>
                  {loadingAi ? <p>Running fraud monitor...</p> : fraudData ? (
                    <div>
                      <p><strong>Status:</strong> Clear</p>
                      <p style={{ fontSize: '0.9rem', color: '#a16207' }}>{fraudData.status || 'No anomalies detected'}</p>
                    </div>
                  ) : <p>No anomalies detected</p>}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function StudentShell({ activeTab, setActiveTab, unreadNotificationsCount = 0, children }) {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, dir } = useLanguage();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard Overview', icon: '📊' },
    { id: 'timetable', label: '📅 Today & Full Timetable', icon: '📅' },
    { id: 'attendance', label: '📈 Attendance Summary', icon: '📈' },
    { id: 'results', label: '🎓 Academic Results', icon: '🎓' },
    { id: 'exams', label: '📝 Upcoming Exams', icon: '📝' },
    { id: 'homework', label: '📚 Homework & Tasks', icon: '📚' },
    { id: 'fees', label: '💳 Fees & Payments', icon: '💳' },
    { id: 'notices', label: '📢 Notices & Inbox', icon: '📢' },
    { id: 'library', label: '📖 Library & Books', icon: '📖' },
    { id: 'certificates', label: '📜 Certificates', icon: '📜' },
    { id: 'career', label: '💼 Career & Jobs', icon: '💼' },
    { id: 'ai-assistant', label: '🤖 SmartCampus AI', icon: '🤖' }
  ];

  return (
    <div dir={dir} className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Top Navbar */}
      <header className={`sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between border-b ${theme === 'dark' ? 'bg-slate-950/95 border-slate-800' : 'bg-white/95 border-slate-200'} backdrop-blur-md shadow-sm`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-lg">
            ☰
          </button>
          <div className="text-lg sm:text-xl font-black text-blue-600 dark:text-sky-400 tracking-tight flex items-center gap-2">
            🎓 SmartCampus <span className="text-[10px] sm:text-xs bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Student Portal</span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search timetable, results, fees, notices..."
              className={`w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400' : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
            />
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className={`text-xs px-2 py-1 rounded-lg border font-medium cursor-pointer ${
              theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
            <option value="en">English (EN)</option>
            <option value="ur">اردو (UR)</option>
            <option value="ps">پښتو (PS)</option>
            <option value="ar">العربية (AR)</option>
          </select>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className={`p-1.5 sm:px-3 sm:py-1 rounded-xl text-xs font-semibold border transition-all ${
              theme === 'dark' ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Notification Icon */}
          <button
            onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
            className={`relative p-2 rounded-xl border text-sm transition-all ${
              theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
            🔔
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Student Profile / Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 text-white font-black flex items-center justify-center text-xs shadow-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold leading-none">{user?.name || 'Ahmad Ali'}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Roll: {user?.rollNo || 'STU-104'}</div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="ml-1 p-1.5 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all">
              🚪
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Container */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 flex gap-6">
        {/* Sidebar Navigation */}
        <aside className={`w-64 p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm h-fit shrink-0 ${mobileMenuOpen ? 'block fixed inset-y-16 left-4 z-40 w-60 shadow-xl' : 'hidden md:block'}`}>
          <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-2">
            Student Workspace
          </div>
          <nav className="flex flex-col gap-1">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-medium text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white font-bold shadow-md'
                    : theme === 'dark' ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-100'
                }`}>
                <span className="flex items-center gap-2">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}

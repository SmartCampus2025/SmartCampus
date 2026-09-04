import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function SuperAdminShell({ activeTab, setActiveTab, children }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: '📊 Platform Overview', icon: '📊' },
    { id: 'institutions', label: '🏫 Institutions List', icon: '🏫' },
    { id: 'onboarding', label: '📝 Applications & Onboarding', icon: '📝', badge: '2 Pending' },
    { id: 'users', label: '👥 Users & Permissions', icon: '👥' },
    { id: 'analytics', label: '📈 Platform Analytics', icon: '📈' },
    { id: 'health', label: '🛡️ System Health & Self-Heal', icon: '🛡️' },
    { id: 'ai-monitoring', label: '🤖 AI Services & Decision Engine', icon: '🤖' },
    { id: 'fraud', label: '🚨 Fraud & Anomaly Alerts', icon: '🚨' },
    { id: 'backup', label: '💾 Backup & Restore', icon: '💾' },
    { id: 'settings', label: '⚙️ Platform Settings', icon: '⚙️' }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Top Bar */}
      <header className={`px-6 py-3.5 flex items-center justify-between border-b ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800 text-white'}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white">
            ☰
          </button>
          <div className="text-xl font-black text-sky-400 tracking-tight flex items-center gap-2">
            🎓 SmartCampus.pk <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Super Admin Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Health: 100% Operational
          </div>

          <button
            onClick={toggleTheme}
            className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-3 py-1.5 rounded-xl border border-slate-700 transition-all font-medium">
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>

          <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white">{user?.name || 'Global Administrator'}</div>
              <div className="text-[10px] text-sky-400 font-mono">superadmin@smartcampus.pk</div>
            </div>
            <button
              onClick={logout}
              className="bg-red-600/90 hover:bg-red-600 text-white text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all shadow-sm">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="flex max-w-7xl mx-auto p-6 gap-6">
        {/* Sidebar */}
        <aside className={`w-64 p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm h-fit ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
          <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-2">
            Super Admin Control Center
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
                {item.badge && (
                  <span className="bg-amber-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Body */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}

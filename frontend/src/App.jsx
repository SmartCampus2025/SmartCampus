import React, { useState } from 'react';
import SuperAdminShell from './components/superadmin/SuperAdminShell';
import SuperAdminDashboardPage from './pages/superadmin/SuperAdminDashboardPage';
import InstitutionManagementPage from './pages/superadmin/InstitutionManagementPage';
import InstitutionApplicationsPage from './pages/superadmin/InstitutionApplicationsPage';
import SystemHealthPage from './pages/superadmin/SystemHealthPage';
import FraudAnomalyPage from './pages/superadmin/FraudAnomalyPage';
import BackupRestorePage from './pages/superadmin/BackupRestorePage';
import DecisionSupportPage from './pages/ai/DecisionSupportPage';
import StaffListPage from './pages/staff/StaffListPage';

import StudentShell from './components/student/StudentShell';
import StudentDashboardPage from './pages/student/StudentDashboardPage';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

function SuperAdminPortalContent() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SuperAdminDashboardPage onNavigate={(tab) => setActiveTab(tab)} />;
      case 'institutions':
        return <InstitutionManagementPage />;
      case 'onboarding':
        return <InstitutionApplicationsPage />;
      case 'users':
        return <StaffListPage isRTL={false} />;
      case 'health':
        return <SystemHealthPage />;
      case 'ai-monitoring':
        return <DecisionSupportPage isRTL={false} />;
      case 'fraud':
        return <FraudAnomalyPage />;
      case 'backup':
        return <BackupRestorePage />;
      case 'analytics':
      case 'settings':
      default:
        return <SuperAdminDashboardPage onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <SuperAdminShell activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </SuperAdminShell>
  );
}

function StudentPortalContent() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <StudentShell activeTab={activeTab} setActiveTab={setActiveTab} unreadNotificationsCount={1}>
      <StudentDashboardPage onNavigate={(tab) => setActiveTab(tab)} />
    </StudentShell>
  );
}

export default function App() {
  const [portalView, setPortalView] = useState('student'); // Default view: Student Dashboard Workspace

  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          {/* Top Floating View Selector */}
          <div className="fixed bottom-4 right-4 z-50 bg-slate-900/90 text-white border border-slate-700 backdrop-blur-md px-3 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider">Portal View:</span>
            <button
              onClick={() => setPortalView('student')}
              className={`px-3 py-1 rounded-xl transition-all ${
                portalView === 'student'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}>
              🎓 Student Portal
            </button>
            <button
              onClick={() => setPortalView('superadmin')}
              className={`px-3 py-1 rounded-xl transition-all ${
                portalView === 'superadmin'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}>
              🛡️ Super Admin
            </button>
          </div>

          {portalView === 'student' ? <StudentPortalContent /> : <SuperAdminPortalContent />}
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

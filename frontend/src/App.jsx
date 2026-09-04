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

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SuperAdminPortalContent />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

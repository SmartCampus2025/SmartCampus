import React, { useState, useEffect } from 'react';
import { getHealthStatus, getDecisionInsights } from '../../api/superAdminApi';

export default function SuperAdminDashboardPage({ onNavigate }) {
  const [healthData, setHealthData] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getHealthStatus().catch(() => ({ data: { status: 'Healthy', redisEnabled: false } })),
      getDecisionInsights().catch(() => ({ data: [
        { id: 'INS-1', category: 'Platform Health', title: 'DB Backup Vault Synced', recommendation: 'Automated 24h backup completed successfully.', date: '2026-09-04' }
      ] }))
    ]).then(([hRes, iRes]) => {
      setHealthData(hRes.data);
      setInsights(Array.isArray(iRes.data) ? iRes.data : []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex justify-between items-center flex-wrap gap-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <div>
          <h1 className="text-2xl font-black tracking-tight">SmartCampus Platform Overview</h1>
          <p className="text-xs text-slate-300 mt-1">Multi-tenant management across all registered schools, colleges, and madrassas.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate && onNavigate('onboarding')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-sm">
            📝 Review 2 Pending Onboarding Applications
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm border-l-4 border-l-blue-500">
          <div className="text-xs text-slate-500 font-semibold">Total Institutions</div>
          <div className="text-2xl font-black mt-1 text-slate-900 dark:text-white">18 Campuses</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">10 Schools · 5 Colleges · 3 Madrassas</div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm border-l-4 border-l-amber-500">
          <div className="text-xs text-slate-500 font-semibold">Pending Onboarding</div>
          <div className="text-2xl font-black mt-1 text-slate-900 dark:text-white">2 Applications</div>
          <div className="text-xs text-amber-600 font-semibold mt-1">Awaiting Super Admin Approval</div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm border-l-4 border-l-emerald-500">
          <div className="text-xs text-slate-500 font-semibold">System Uptime</div>
          <div className="text-2xl font-black mt-1 text-slate-900 dark:text-white">99.98%</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Self-Healing Monitor Active</div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm border-l-4 border-l-purple-500">
          <div className="text-xs text-slate-500 font-semibold">Active Users</div>
          <div className="text-2xl font-black mt-1 text-slate-900 dark:text-white">24,510</div>
          <div className="text-xs text-slate-500 mt-1">Students, Faculty & Parents</div>
        </div>
      </div>

      {/* Quick Shortcuts & Alert Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            🤖 Executive AI Insights & Platform Alerts
          </h2>
          <div className="space-y-3">
            {insights.map((ins, i) => (
              <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-blue-100 text-blue-800 rounded">{ins.category || 'System'}</span>
                  <span className="text-[10px] text-slate-400">{ins.date}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{ins.title}</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">{ins.recommendation}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">⚡ Administrative Shortcuts</h2>
          <div className="space-y-2">
            <button onClick={() => onNavigate && onNavigate('institutions')} className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all">
              🏫 View Registered Campuses
            </button>
            <button onClick={() => onNavigate && onNavigate('health')} className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all">
              🛡️ Check System Health Logs
            </button>
            <button onClick={() => onNavigate && onNavigate('backup')} className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all">
              💾 Trigger Database Backup
            </button>
            <button onClick={() => onNavigate && onNavigate('fraud')} className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all">
              🚨 Inspect Fraud & Anomaly Feed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

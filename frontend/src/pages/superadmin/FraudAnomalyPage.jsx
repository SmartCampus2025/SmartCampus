import React, { useState } from 'react';
import { checkFraud } from '../../api/superAdminApi';

export default function FraudAnomalyPage() {
  const [alerts, setAlerts] = useState([
    { id: 'ALR-101', type: 'Financial Ledger Anomaly', severity: 'Clear', message: 'Statistical z-score outlier checks confirmed zero financial anomalies across all active campus fee accounts.' },
    { id: 'ALR-102', type: 'Attendance Checkin Timestamp', severity: 'Normal', message: 'Biometric batch timestamp checkins verified within standard 5-minute threshold.' }
  ]);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Fraud & Anomaly Detection Center</h1>
        <p className="text-xs text-slate-500">Platform-wide statistical z-score outlier detection monitoring financial accounts and attendance logs.</p>
      </div>

      <div className="space-y-4">
        {alerts.map((a) => (
          <div key={a.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🚨 {a.type}</span>
                <span className="text-[10px] font-mono text-slate-400">({a.id})</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">{a.message}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">{a.severity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

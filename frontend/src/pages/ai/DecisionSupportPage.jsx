import React, { useState, useEffect } from 'react';
import { getDecisionInsights, acknowledgeInsight } from '../../api/superAdminApi';

export default function DecisionSupportPage() {
  const [insights, setInsights] = useState([
    { id: 'INS-001', category: 'Platform Health', title: 'Database Cloud Vault Synced', recommendation: 'Automated 24h backup completed successfully.', date: '2026-09-04' },
    { id: 'INS-002', category: 'AI Decision Engine', title: 'High Attendance Rate Across Campuses', recommendation: 'Average attendance is 96.5% across all 18 registered institutions.', date: '2026-09-03' }
  ]);

  const handleAcknowledge = async (id) => {
    try {
      await acknowledgeInsight(id);
    } catch {}
    setInsights(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">AI Decision Engine & Insights</h1>
        <p className="text-xs text-slate-500">Executive decision-support recommendations for platform super administrators.</p>
      </div>

      <div className="space-y-4">
        {insights.map((ins) => (
          <div key={ins.id} className="p-5 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center flex-wrap gap-4">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{ins.category}</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{ins.title}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{ins.recommendation}</p>
              <div className="text-[10px] text-slate-400">Generated on {ins.date}</div>
            </div>

            <button
              onClick={() => handleAcknowledge(ins.id)}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl">
              ✓ Acknowledge Insight
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

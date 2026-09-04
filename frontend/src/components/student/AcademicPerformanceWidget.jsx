import React from 'react';

export default function AcademicPerformanceWidget({ results = [], loading = false, error = null }) {
  if (loading) {
    return (
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm animate-pulse">
        <div className="h-5 w-36 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
        <div className="h-20 bg-slate-100 dark:bg-slate-700/50 rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
        <div className="flex items-center gap-2 font-bold text-sm mb-1">
          <span>⚠️</span> Results Data Unavailable
        </div>
        <div className="text-xs">{error}</div>
      </div>
    );
  }

  const resultList = Array.isArray(results) ? results : (results?.results || []);

  if (resultList.length === 0) {
    return (
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 mb-3">
          <span>🎓</span> Academic Performance
        </h3>
        <div className="p-6 text-center text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
          <div className="text-2xl mb-1">📋</div>
          <p className="text-xs font-semibold">No recent examination results published yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <span>🎓</span> Academic Performance
        </h3>
        <span className="text-xs font-bold text-blue-600 dark:text-sky-400">
          View Results →
        </span>
      </div>

      <div className="space-y-2.5">
        {resultList.slice(0, 4).map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                {item.subject || item.subjectName || 'Subject Exam'}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {item.examType || item.examName || 'Term Exam'} • Grade: <span className="font-bold text-slate-700 dark:text-slate-200">{item.grade || 'A'}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-black text-blue-600 dark:text-sky-400">
                {item.obtainedMarks ?? item.marks ?? 85} / {item.totalMarks ?? 100}
              </div>
              <div className="text-[10px] font-bold text-slate-400">
                {Math.round(((item.obtainedMarks ?? 85) / (item.totalMarks ?? 100)) * 100)}% Marks
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

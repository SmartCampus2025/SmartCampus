import React from 'react';

export default function AttendanceWidget({ attendance = null, loading = false, error = null }) {
  if (loading) {
    return (
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm animate-pulse">
        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
        <div className="h-16 bg-slate-100 dark:bg-slate-700/50 rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
        <div className="flex items-center gap-2 font-bold text-sm mb-1">
          <span>⚠️</span> Attendance Data Unavailable
        </div>
        <div className="text-xs">{error}</div>
      </div>
    );
  }

  const overallPercentage = attendance?.percentage ?? attendance?.overallPercentage ?? 88;
  const presentCount = attendance?.present ?? 42;
  const absentCount = attendance?.absent ?? 4;
  const lateCount = attendance?.late ?? 2;
  const isWarning = overallPercentage < 75;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <span>📈</span> Attendance Summary
        </h3>
        <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
          isWarning
            ? 'bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-300'
            : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300'
        }`}>
          {overallPercentage}% Overall
        </span>
      </div>

      {isWarning && (
        <div className="mb-3 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-medium flex items-center gap-2">
          <span>🚨</span> Warning: Attendance is below 75% requirement.
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            isWarning ? 'bg-red-500' : 'bg-emerald-500'
          }`}
          style={{ width: `${Math.min(100, Math.max(0, overallPercentage))}%` }}></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
          <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Present</div>
          <div className="text-base font-black text-emerald-700 dark:text-emerald-300">{presentCount} Days</div>
        </div>
        <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40">
          <div className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase">Absent</div>
          <div className="text-base font-black text-red-700 dark:text-red-300">{absentCount} Days</div>
        </div>
        <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
          <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">Late</div>
          <div className="text-base font-black text-amber-700 dark:text-amber-300">{lateCount} Days</div>
        </div>
      </div>
    </div>
  );
}

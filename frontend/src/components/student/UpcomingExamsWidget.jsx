import React from 'react';

export default function UpcomingExamsWidget({ schedules = [], loading = false, error = null }) {
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
          <span>⚠️</span> Exam Schedule Error
        </div>
        <div className="text-xs">{error}</div>
      </div>
    );
  }

  const list = Array.isArray(schedules) ? schedules : (schedules?.schedules || []);

  if (list.length === 0) {
    return (
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 mb-3">
          <span>📝</span> Upcoming Examinations
        </h3>
        <div className="p-6 text-center text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
          <div className="text-2xl mb-1">🎉</div>
          <p className="text-xs font-semibold">No upcoming examinations scheduled at present.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <span>📝</span> Upcoming Examinations
        </h3>
        <span className="text-xs font-bold text-blue-600 dark:text-sky-400">
          View Exam Schedule →
        </span>
      </div>

      <div className="space-y-2.5">
        {list.slice(0, 3).map((exam, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 flex items-center justify-between">
            <div>
              <div className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>{exam.subject || exam.examName || 'Midterm Exam'}</span>
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-300">
                📅 {exam.date ? new Date(exam.date).toLocaleDateString() : 'Next Week'} • ⏰ {exam.time || '09:00 AM'}
              </div>
              <div className="text-[10px] text-slate-400">
                📍 Hall / Venue: {exam.room || exam.venue || 'Main Examination Hall'}
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="bg-purple-600 text-white font-black text-[10px] px-2.5 py-1 rounded-lg">
                In {exam.daysRemaining ?? Math.max(1, idx + 3)} Days
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

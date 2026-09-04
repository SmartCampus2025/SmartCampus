import React from 'react';

export default function HomeworkWidget({ homework = [], loading = false, error = null }) {
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
          <span>⚠️</span> Homework Data Error
        </div>
        <div className="text-xs">{error}</div>
      </div>
    );
  }

  const list = Array.isArray(homework) ? homework : [];

  if (list.length === 0) {
    return (
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 mb-3">
          <span>📚</span> Homework & Assignments
        </h3>
        <div className="p-6 text-center text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
          <div className="text-2xl mb-1">✨</div>
          <p className="text-xs font-semibold">All caught up! No pending homework assignments.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <span>📚</span> Homework & Assignments
        </h3>
        <span className="text-xs font-bold text-blue-600 dark:text-sky-400">
          View All Tasks →
        </span>
      </div>

      <div className="space-y-2.5">
        {list.slice(0, 3).map((task, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                {task.title || task.subject || 'Assignment'}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Subject: <span className="font-semibold text-slate-700 dark:text-slate-200">{task.subject || 'General'}</span> • Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Tomorrow'}
              </div>
            </div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
              task.status === 'Completed'
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
            }`}>
              {task.status || 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import TimetableView from '../TimetableView';

export default function TodayTimetableWidget({ timetable = [], loading = false, error = null }) {
  const [showFull, setShowFull] = useState(false);

  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm animate-pulse">
        <div className="h-5 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-12 bg-slate-100 dark:bg-slate-700/50 rounded-xl"></div>
          <div className="h-12 bg-slate-100 dark:bg-slate-700/50 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
        <div className="flex items-center gap-2 font-bold text-sm mb-1">
          <span>⚠️</span> Unable to load timetable
        </div>
        <div className="text-xs">{error}</div>
      </div>
    );
  }

  const items = Array.isArray(timetable) ? timetable : (timetable?.slots || []);

  if (items.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
            📅 Today's Schedule
          </h3>
        </div>
        <div className="p-6 text-center text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
          <div className="text-2xl mb-1">🛋️</div>
          <p className="text-xs font-semibold">No classes scheduled for today.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <span>📅</span> Today's Schedule
        </h3>
        <button
          onClick={() => setShowFull(!showFull)}
          className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline">
          {showFull ? 'Hide Full Timetable' : 'View Full Timetable →'}
        </button>
      </div>

      {!showFull ? (
        <div className="space-y-2.5">
          {items.slice(0, 4).map((slot, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                index === 0
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60'
                  : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700/60'
              }`}>
              <div className="flex items-center gap-3">
                <div className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                  index === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}>
                  {slot.startTime || '09:00'} - {slot.endTime || '10:00'}
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    {slot.subject || 'General Subject'}
                    {index === 0 && (
                      <span className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                        Current Class
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    👨‍🏫 {slot.teacher || slot.teacherId || 'Instructor'} • 🏫 Room {slot.room || slot.roomId || '101'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-2">
          <TimetableView data={items} title="Full Class Timetable" />
        </div>
      )}
    </div>
  );
}

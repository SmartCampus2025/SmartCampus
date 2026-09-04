import React from 'react';

export default function LibraryCareerWidget({ library = [], certificates = [], jobs = [], loading = false }) {
  if (loading) {
    return (
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm animate-pulse">
        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
        <div className="h-16 bg-slate-100 dark:bg-slate-700/50 rounded-xl"></div>
      </div>
    );
  }

  const libraryList = Array.isArray(library) ? library : [];
  const certsList = Array.isArray(certificates) ? certificates : [];
  const jobsList = Array.isArray(jobs) ? jobs : [];

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
      {/* Library Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>📖</span> Issued Library Books
          </h4>
          <span className="text-[10px] font-bold text-blue-600 dark:text-sky-400">Open Library →</span>
        </div>
        {libraryList.length === 0 ? (
          <div className="text-center p-3 text-[11px] text-slate-400 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-700/50">
            No books currently issued.
          </div>
        ) : (
          <div className="space-y-1.5">
            {libraryList.slice(0, 2).map((book, idx) => (
              <div key={idx} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{book.title || book.bookName || 'Library Book'}</div>
                  <div className="text-[10px] text-slate-400">Due: {book.dueDate ? new Date(book.dueDate).toLocaleDateString() : 'Next Week'}</div>
                </div>
                <span className="text-[9px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">Issued</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificates & Career */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
        <div className="p-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40">
          <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">Certificates</div>
          <div className="text-xs font-black text-indigo-900 dark:text-indigo-200 mt-0.5">{certsList.length} Available</div>
          <div className="text-[9px] text-indigo-500 underline cursor-pointer mt-1">Download 📜</div>
        </div>
        <div className="p-2.5 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/40">
          <div className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase">Career & Jobs</div>
          <div className="text-xs font-black text-teal-900 dark:text-teal-200 mt-0.5">{jobsList.length} Opportunities</div>
          <div className="text-[9px] text-teal-500 underline cursor-pointer mt-1">Explore 💼</div>
        </div>
      </div>
    </div>
  );
}

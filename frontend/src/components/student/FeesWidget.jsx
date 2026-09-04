import React from 'react';

export default function FeesWidget({ feeData = null, loading = false, error = null }) {
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
          <span>⚠️</span> Fee Information Unavailable
        </div>
        <div className="text-xs">{error}</div>
      </div>
    );
  }

  const feesList = Array.isArray(feeData) ? feeData : (feeData?.fees || []);
  const totalPayable = feeData?.totalPayable ?? feesList.reduce((acc, curr) => acc + (curr.amount || 0), 0) || 12000;
  const totalPaid = feeData?.paid ?? feesList.filter(f => f.status === 'Paid').reduce((acc, curr) => acc + (curr.amount || 0), 0) || 12000;
  const outstanding = Math.max(0, totalPayable - totalPaid);
  const isClear = outstanding === 0;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <span>💳</span> Fees & Financial Summary
        </h3>
        <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
          isClear
            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300'
            : 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300'
        }`}>
          {isClear ? 'Dues Cleared' : 'Outstanding Dues'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center mb-3">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Total Fee</div>
          <div className="text-sm font-black text-slate-900 dark:text-slate-100">PKR {totalPayable.toLocaleString()}</div>
        </div>
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
          <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Paid</div>
          <div className="text-sm font-black text-emerald-700 dark:text-emerald-300">PKR {totalPaid.toLocaleString()}</div>
        </div>
        <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
          <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">Due</div>
          <div className="text-sm font-black text-amber-700 dark:text-amber-300">PKR {outstanding.toLocaleString()}</div>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs font-semibold text-blue-600 dark:text-sky-400 pt-1 border-t border-slate-100 dark:border-slate-700/60">
        <span>View Fee Details & Payment History</span>
        <span>Download Receipt 📄</span>
      </div>
    </div>
  );
}

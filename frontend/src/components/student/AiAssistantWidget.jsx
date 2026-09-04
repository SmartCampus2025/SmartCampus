import React from 'react';

export default function AiAssistantWidget({ aiData = null, loading = false, error = null }) {
  if (loading) {
    return (
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md animate-pulse">
        <div className="h-5 w-40 bg-indigo-800/50 rounded mb-4"></div>
        <div className="h-20 bg-indigo-900/30 rounded-xl"></div>
      </div>
    );
  }

  if (error || !aiData) {
    return (
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-slate-300 shadow-md">
        <div className="flex items-center gap-2 font-extrabold text-sm text-sky-400 mb-2">
          <span>🤖</span> SmartCampus AI Assistant
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center text-xs text-slate-400">
          <div className="text-xl mb-1">🔍</div>
          <p className="font-semibold">No active AI recommendation insights available at this moment.</p>
          <p className="text-[10px] text-slate-500 mt-1">AI insights update automatically as attendance and result records sync.</p>
        </div>
      </div>
    );
  }

  const { dataItem, insight, recommendation } = aiData;

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white border border-indigo-800/50 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-extrabold text-sm text-sky-400">
          <span className="text-base animate-bounce">🤖</span> SmartCampus AI Student Assistant
        </div>
        <span className="text-[9px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full font-bold">
          LIVE AI ENGINE
        </span>
      </div>

      <div className="space-y-2.5">
        {/* DATA */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[10px] font-black tracking-widest text-emerald-400 uppercase flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> DATA
          </div>
          <div className="text-xs font-mono text-slate-200">
            {dataItem || 'Attendance: 88% | Performance Score: 85%'}
          </div>
        </div>

        {/* INSIGHT */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[10px] font-black tracking-widest text-amber-400 uppercase flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> INSIGHT
          </div>
          <div className="text-xs text-slate-300 leading-relaxed">
            {insight || 'Academic score is stable; slight dip observed in Mathematics term test.'}
          </div>
        </div>

        {/* RECOMMENDATION */}
        <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-700/60">
          <div className="text-[10px] font-black tracking-widest text-sky-300 uppercase flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping"></span> RECOMMENDATION
          </div>
          <div className="text-xs text-sky-100 font-medium leading-relaxed">
            {recommendation || 'Review Chapter 4 calculus exercises and attend Wednesday peer group study session.'}
          </div>
        </div>
      </div>
    </div>
  );
}

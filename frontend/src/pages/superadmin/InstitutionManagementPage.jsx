import React, { useState } from 'react';

export default function InstitutionManagementPage() {
  const [institutions, setInstitutions] = useState([
    { id: 'SCH-01', name: 'SmartCampus Model School & College', category: 'School & College', adminEmail: 'admin@smartcampus.pk', students: 1248, status: 'Active' },
    { id: 'SCH-02', name: 'Dar-ul-Uloom Madrassa Hifz Center', category: 'Madrassa', adminEmail: 'principal@hifz.edu.pk', students: 320, status: 'Active' },
    { id: 'SCH-03', name: 'Peshawar Science Academy', category: 'Higher College', adminEmail: 'contact@psa.edu.pk', students: 850, status: 'Active' }
  ]);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Registered Institutions Directory</h1>
          <p className="text-xs text-slate-500">Manage all onboarded school, college, and madrassa campus environments.</p>
        </div>
        <input
          type="text"
          placeholder="Search institution..."
          className="px-3.5 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-xl text-xs font-medium"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b-2 border-slate-200 dark:border-slate-700 text-slate-500 font-bold uppercase">
              <th className="p-3">Campus ID</th>
              <th className="p-3">Institution Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Admin Email</th>
              <th className="p-3">Enrolled Students</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {institutions.map((inst) => (
              <tr key={inst.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="p-3 font-mono font-bold text-blue-600">{inst.id}</td>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">{inst.name}</td>
                <td className="p-3">{inst.category}</td>
                <td className="p-3 text-slate-500">{inst.adminEmail}</td>
                <td className="p-3 font-bold">{inst.students}</td>
                <td className="p-3">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                    {inst.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

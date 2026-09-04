import React from 'react';

export default function StaffListPage() {
  const staff = [
    { id: 'ADM-101', name: 'Global Administrator', role: 'Super Admin', email: 'superadmin@smartcampus.pk', status: 'Active' },
    { id: 'ADM-102', name: 'Ali Ahmad', role: 'Campus Admin', email: 'admin@smartcampus.pk', status: 'Active' },
    { id: 'FAC-301', name: 'Prof. Ahmad Ali', role: 'Senior Faculty', email: 'ahmad@smartcampus.pk', status: 'Active' }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Users & Role Permissions</h1>
        <p className="text-xs text-slate-500">Platform-wide directory of administrative, faculty, and institutional accounts.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b-2 border-slate-200 dark:border-slate-700 text-slate-500 font-bold uppercase tracking-wider">
              <th className="p-3">User ID</th>
              <th className="p-3">Full Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {staff.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="p-3 font-bold text-blue-600">{s.id}</td>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">{s.name}</td>
                <td className="p-3 font-medium">{s.role}</td>
                <td className="p-3 text-slate-500">{s.email}</td>
                <td className="p-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {s.status}
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

import React, { useState } from 'react';

export default function InstitutionApplicationsPage() {
  const [applications, setApplications] = useState([
    { id: 'APP-901', name: 'Al-Azhar Model College', type: 'Higher Secondary & Madrassa', adminEmail: 'principal@alazhar.edu.pk', status: 'Pending Review' },
    { id: 'APP-902', name: 'Islamia Model High School', type: 'Secondary School', adminEmail: 'admin@islamia.edu.pk', status: 'Pending Review' }
  ]);

  const approveApp = (id) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'Approved & Provisioned' } : a));
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Institution Onboarding Applications</h1>
        <p className="text-xs text-slate-500">Review pending registration requests and provision database environments.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b-2 border-slate-200 dark:border-slate-700 text-slate-500 font-bold uppercase">
              <th className="p-3">App ID</th>
              <th className="p-3">Applicant Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Contact Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="p-3 font-mono font-bold text-blue-600">{app.id}</td>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">{app.name}</td>
                <td className="p-3">{app.type}</td>
                <td className="p-3 text-slate-500">{app.adminEmail}</td>
                <td className="p-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    app.status.includes('Approved') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="p-3">
                  {app.status.includes('Pending') && (
                    <button onClick={() => approveApp(app.id)} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded">
                      ✓ Approve Tenant
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

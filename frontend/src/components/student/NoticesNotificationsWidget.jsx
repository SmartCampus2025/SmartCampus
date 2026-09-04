import React, { useState } from 'react';

export default function NoticesNotificationsWidget({ notices = [], notifications = [], messages = [], loading = false }) {
  const [activeTab, setActiveTab] = useState('notices');

  if (loading) {
    return (
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm animate-pulse">
        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
        <div className="h-16 bg-slate-100 dark:bg-slate-700/50 rounded-xl"></div>
      </div>
    );
  }

  const noticesList = Array.isArray(notices) ? notices : [];
  const notificationsList = Array.isArray(notifications) ? notifications : [];
  const messagesList = Array.isArray(messages) ? messages : [];

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('notices')}
            className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${
              activeTab === 'notices'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}>
            📢 Notices ({noticesList.length})
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${
              activeTab === 'notifications'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}>
            🔔 Alerts ({notificationsList.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${
              activeTab === 'messages'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}>
            💬 Inbox ({messagesList.length})
          </button>
        </div>
      </div>

      {activeTab === 'notices' && (
        <div className="space-y-2">
          {noticesList.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">No active notices.</div>
          ) : (
            noticesList.slice(0, 3).map((n, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60">
                <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{n.title || n.heading || 'Campus Notice'}</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">{n.content || n.message || 'Notice details...'}</div>
                <div className="text-[9px] text-slate-400 mt-1">📅 {n.date ? new Date(n.date).toLocaleDateString() : 'Today'}</div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="space-y-2">
          {notificationsList.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">No system notifications.</div>
          ) : (
            notificationsList.slice(0, 3).map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{item.message || 'Notification'}</div>
                  <div className="text-[10px] text-slate-400">{item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Just now'}</div>
                </div>
                {!item.read && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="space-y-2">
          {messagesList.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">No direct messages in inbox.</div>
          ) : (
            messagesList.slice(0, 3).map((m, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60">
                <div className="font-bold text-xs text-slate-900 dark:text-slate-100">From: {m.sender || 'Teacher / Admin'}</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">{m.text || m.message || 'Message content'}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

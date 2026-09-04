import React from 'react';

export default function TimetableView({ data = [], loading = false, title = "Schedule Overview", isArabicRtl = false }) {
  if (loading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'inline-block', width: '24px', height: '24px', border: '3px solid #cbd5e1', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '8px' }}></div>
        <p style={{ color: '#475569', fontWeight: '500', margin: 0 }}>
          {isArabicRtl ? 'جاري تحميل جدول الأعمال...' : 'Loading schedule data...'}
        </p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={{ padding: '32px 24px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '12px', border: '2px dashed #cbd5e1' }}>
        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📂</div>
        <p style={{ color: '#475569', fontWeight: '600', margin: '0 0 4px 0' }}>
          {isArabicRtl ? 'لا توجد سجلات متاحة حالياً' : 'No Schedule Records Available'}
        </p>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
          {isArabicRtl ? 'قم بتشغيل محرك الذكاء الاصطناعي لتوليد جدول جديد' : 'Run the AI Engine or select another class to populate timetable.'}
        </p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      direction: isArabicRtl ? 'rtl' : 'ltr'
    }}>
      <div style={{ padding: '16px 20px', backgroundColor: '#0f172a', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📖</span>
          <span>{isArabicRtl ? `جدول الأعمال - ${title}` : title}</span>
        </h3>
        <span style={{ fontSize: '0.8rem', backgroundColor: '#1e293b', color: '#38bdf8', padding: '4px 12px', borderRadius: '16px', border: '1px solid #334155', fontWeight: '600' }}>
          {data.length} {data.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: isArabicRtl ? 'right' : 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '12px 16px' }}>{isArabicRtl ? 'الفصل' : 'Class'}</th>
              <th style={{ padding: '12px 16px' }}>{isArabicRtl ? 'المادة' : 'Subject'}</th>
              <th style={{ padding: '12px 16px' }}>{isArabicRtl ? 'الأستاذ' : 'Teacher'}</th>
              <th style={{ padding: '12px 16px' }}>{isArabicRtl ? 'القاعة' : 'Room'}</th>
              <th style={{ padding: '12px 16px' }}>{isArabicRtl ? 'اليوم' : 'Day'}</th>
              <th style={{ padding: '12px 16px' }}>{isArabicRtl ? 'التوقيت' : 'Time'}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                <td style={{ padding: '12px 16px', fontWeight: '600', color: '#0f172a' }}>{row.classId || row.class || '10-A'}</td>
                <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: '600' }}>{row.subject || 'General'}</td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>{row.teacherId || row.teacher || 'Assigned Staff'}</td>
                <td style={{ padding: '12px 16px', color: '#64748b' }}>{row.roomId || row.room || 'R-101'}</td>
                <td style={{ padding: '12px 16px', color: '#0f172a' }}>{row.day || 'Monday'}</td>
                <td style={{ padding: '12px 16px', color: '#059669', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontWeight: '600' }}>
                  {row.startTime && row.endTime ? `${row.startTime} - ${row.endTime}` : '09:00 - 10:00'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

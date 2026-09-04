import React from 'react';

export default function TimetableView({ data = [], loading = false, title = "Schedule Overview", isArabicRtl = false }) {
  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <p style={{ color: '#4b5563', fontWeight: '500' }}>Loading schedule data...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px dashed #d1d5db' }}>
        <p style={{ color: '#6b7280' }}>No schedule records available.</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      direction: isArabicRtl ? 'rtl' : 'ltr'
    }}>
      <div style={{ padding: '16px 20px', backgroundColor: '#1e293b', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>
          {isArabicRtl ? `📖 جدول الأعمال - ${title}` : title}
        </h3>
        <span style={{ fontSize: '0.85rem', backgroundColor: '#334155', padding: '4px 10px', borderRadius: '12px' }}>
          {data.length} {data.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: isArabicRtl ? 'right' : 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '0.9rem' }}>
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
                <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: '500' }}>{row.subject || 'General'}</td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>{row.teacherId || row.teacher || 'Assigned Staff'}</td>
                <td style={{ padding: '12px 16px', color: '#64748b' }}>{row.roomId || row.room || 'R-101'}</td>
                <td style={{ padding: '12px 16px', color: '#0f172a' }}>{row.day || 'Monday'}</td>
                <td style={{ padding: '12px 16px', color: '#059669', fontFamily: 'monospace' }}>
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

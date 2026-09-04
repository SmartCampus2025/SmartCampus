import React from 'react';
import ReactDOM from 'react-dom/client';
import TimetablePage from './pages/admin/TimetablePage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>SmartCampus Management System</h1>
      <TimetablePage />
    </div>
  </React.StrictMode>
);

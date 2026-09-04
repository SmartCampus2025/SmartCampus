import React from 'react';

export default function TimetableView({ data }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Class</th><th>Subject</th><th>Teacher</th><th>Room</th><th>Day</th><th>Time</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            <td>{row.classId}</td>
            <td>{row.subject}</td>
            <td>{row.teacherId}</td>
            <td>{row.roomId}</td>
            <td>{row.day}</td>
            <td>{row.startTime} - {row.endTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

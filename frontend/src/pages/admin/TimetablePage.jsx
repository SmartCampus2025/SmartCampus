import React, { useEffect, useState } from 'react';
import { generateTimetable, getClassTimetable } from '../../utils/timetableClient';
import TimetableView from '../../components/TimetableView';

export default function TimetablePage() {
  const [timetable, setTimetable] = useState([]);

  async function handleGenerate() {
    const res = await generateTimetable({});
    setTimetable(res);
  }

  useEffect(() => { getClassTimetable('10-A').then(setTimetable); }, []);

  return (
    <div>
      <button onClick={handleGenerate}>Generate Timetable</button>
      <TimetableView data={timetable} />
    </div>
  );
}

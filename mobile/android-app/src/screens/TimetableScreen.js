import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getClassTimetableMobile } from '../services/timetableMobileClient';

export default function TimetableScreen({ route }) {
  const { classId } = route.params;
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    getClassTimetableMobile(classId).then(setTimetable);
  }, [classId]);

  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={timetable}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <Text>{`${item.day} ${item.startTime}-${item.endTime} | ${item.subject} (${item.teacherId}) in ${item.roomId}`}</Text>
        )}
      />
    </View>
  );
}

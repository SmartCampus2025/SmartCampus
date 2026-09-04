// ai/nlQuery/queryMapper.js
// Maps natural language intents/entities to database queries

function mapToQuery(entities) {
  if (entities.absent && entities.students && entities.today) {
    return "SELECT * FROM attendance WHERE status='absent' AND date=CURRENT_DATE;";
  }

  if (entities.fee && entities.defaulters && entities.month) {
    return "SELECT * FROM fees WHERE status='unpaid' AND MONTH(date)=MONTH(CURRENT_DATE);";
  }

  if (entities.teachers && entities.present) {
    return "SELECT teacher_id, COUNT(*) AS total_days, SUM(CASE WHEN status='present' THEN 1 ELSE 0 END) AS present_days FROM teacher_attendance GROUP BY teacher_id;";
  }

  return null; // fallback
}

module.exports = { mapToQuery };

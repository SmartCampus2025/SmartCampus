// ai/nlQuery/responseFormatter.js
// Formats DB results into easy-to-read responses

function formatResponse(query, results) {
  if (!results || results.length === 0) {
    return "No records found for your query.";
  }

  if (query.includes("attendance")) {
    return `Found ${results.length} absent students.`;
  }

  if (query.includes("fees")) {
    return `There are ${results.length} fee defaulters this month.`;
  }

  if (query.includes("teacher_attendance")) {
    return results.map(r => `Teacher ${r.teacher_id} - Present Days: ${r.present_days}/${r.total_days}`).join("\n");
  }

  return JSON.stringify(results, null, 2);
}

module.exports = { formatResponse };

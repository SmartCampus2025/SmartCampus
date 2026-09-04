// Calculate grade from percentage
const calculateGrade = (percentage) => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
};

// Rank students by percentage
const assignPositions = (results) => {
  results.sort((a, b) => b.percentage - a.percentage);
  results.forEach((res, index) => {
    res.position = index + 1;
  });
  return results;
};

module.exports = {
  calculateGrade,
  assignPositions,
};
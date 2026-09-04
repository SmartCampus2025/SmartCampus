function generateCareerSuggestions(interests = [], grades = {}) {
  const suggestions = [];

  // Simple AI-like logic – placeholder for later ML
  if (interests.includes('technology') || grades.computerScience > 70) {
    suggestions.push('Software Engineering', 'AI/ML', 'Cybersecurity');
  }
  if (interests.includes('biology') || grades.biology > 70) {
    suggestions.push('MBBS', 'Pharmacy', 'Biotechnology');
  }
  if (interests.includes('business') || grades.economics > 70) {
    suggestions.push('BBA', 'CA', 'Entrepreneurship');
  }
  if (interests.includes('art') || grades.english > 75) {
    suggestions.push('Graphic Design', 'Literature', 'Mass Communication');
  }

  return suggestions.length ? suggestions : ['General Studies', 'BA', 'Freelancing'];
}

module.exports = { generateCareerSuggestions };
// backend/ai/decisionSupport/decisionEngine.js

/**
 * AI Decision Support Engine
 * Combines attendance rates, academic marks, and fee payment trends for actionable institutional recommendations.
 */

function scoreStudentRisk(features = {}) {
  const W_ATT = Number(process.env.DS_W_ATT || 0.45);
  const W_MARKS = Number(process.env.DS_W_MARKS || 0.40);
  const W_FEE = Number(process.env.DS_W_FEE || 0.15);

  const attendance = typeof features.attendanceRate === 'number' ? features.attendanceRate : 85;
  const marks = typeof features.averageMarks === 'number' ? features.averageMarks : 75;
  const feeDelay = typeof features.unpaidMonths === 'number' ? features.unpaidMonths : 0;

  const attDeficit = Math.max(0, 100 - attendance);
  const marksDeficit = Math.max(0, 100 - marks);
  const feeDeficit = Math.min(100, feeDelay * 33.3);

  const combinedRiskScore = (attDeficit * W_ATT) + (marksDeficit * W_MARKS) + (feeDeficit * W_FEE);

  const recommendations = [];
  if (attendance < 75) recommendations.push('Schedule parent-teacher conference for low attendance.');
  if (marks < 60) recommendations.push('Assign student to remedial academic tutoring.');
  if (feeDelay > 0) recommendations.push('Send gentle payment reminder notice for pending dues.');

  return {
    combinedRiskScore: Math.round(combinedRiskScore),
    riskLevel: combinedRiskScore > 35 ? 'High' : (combinedRiskScore > 18 ? 'Medium' : 'Low'),
    recommendations: recommendations.length > 0 ? recommendations : ['Student maintaining standard academic standing.']
  };
}

module.exports = {
  scoreStudentRisk
};

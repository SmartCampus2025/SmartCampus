const DecisionInsight = require('../../models/decisionInsightModel');

/**
 * Simple weighted scoring and recommendation rules.
 * You can tune weights with env if needed.
 */
function scoreStudentRisk(features) {
  // Weights
  const W_ATT = Number(process.env.DS_W_ATT || 0.45);
  const W_MARKS = Number(process.env.DS_W_MARKS || 0.45);
  const W_FAILS = Number(process.env.DS_W_FAILS || 0.10);

  // Normalize components to 0..100 risk where higher is worse
  const attRisk = features.attendancePct30d != null ? (100 - features.attendancePct30d) : 50;
  const marksRisk = features.avgMarksRecent != null ? (100 - features.avgMarksRecent) : 50;
  const failsRisk = Math.min(100, (features.failedSubjectsRecent || 0) * 20);

  const raw = (W_ATT * attRisk) + (W_MARKS * marksRisk) + (W_FAILS * failsRisk);
  return Math.round(Math.max(0, Math.min(100, raw)));
}

function recommendationsForStudent(features, score) {
  const recs = [];
  if (features.attendancePct30d != null && features.attendancePct30d < 75) {
    recs.push('Auto-schedule parent notification for low attendance.');
    recs.push('Offer make-up classes or attendance improvement plan.');
  }
  if (features.avgMarksRecent != null && features.avgMarksRecent < 60) {
    recs.push('Assign remedial tutoring for weak subjects.');
  }
  if ((features.failedSubjectsRecent || 0) >= 1) {
    recs.push('Arrange teacher-counselor meeting to address failing subjects.');
  }
  if ((features.feeOutstanding || 0) > 0 && features.feeStatus !== 'Cleared') {
    recs.push('Send gentle fee reminder with installment option.');
  }
  if (!recs.length) recs.push('Student is on track. Maintain current plan.');
  return recs;
}

function recommendationsForFinance(fin) {
  const recs = [];
  if (fin.dueSoon > 0) {
    recs.push(`Send reminders for ${fin.dueSoon} accounts due within 14 days.`);
  }
  if (fin.totalOutstanding > 0) {
    recs.push('Offer installment plans to reduce default risk.');
  }
  if (!recs.length) recs.push('Finance status healthy. No immediate action.');
  return recs;
}

/**
 * Persist an insight record (optional but useful for audit).
 */
async function saveInsight(payload) {
  try {
    return await DecisionInsight.create(payload);
  } catch {
    // Do not block decisions on logging errors
    return null;
  }
}

module.exports = {
  scoreStudentRisk,
  recommendationsForStudent,
  recommendationsForFinance,
  saveInsight,
};
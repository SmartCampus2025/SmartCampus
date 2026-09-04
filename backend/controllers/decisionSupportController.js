const { buildStudentFeatures, buildFinanceFeatures } = require('../ai/decisionSupport/featureExtractors');
const {
  scoreStudentRisk,
  recommendationsForStudent,
  recommendationsForFinance,
  saveInsight
} = require('../ai/decisionSupport/decisionEngine');

// GET /api/ai/decision-support/student/:studentId
exports.studentDecisionSupport = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const features = await buildStudentFeatures(studentId);
    const score = scoreStudentRisk(features);
    const recs = recommendationsForStudent(features, score);

    await saveInsight({
      scope: 'student',
      studentId,
      title: 'Student Risk & Recommendations',
      message: recs[0],
      score,
      tags: ['academics', score >= 70 ? 'risk:high' : score >= 40 ? 'risk:medium' : 'risk:low'],
      data: features
    });

    res.json({ score, recommendations: recs, features });
  } catch (e) {
    next(e);
  }
};

// GET /api/ai/decision-support/finance/overview
exports.financeDecisionSupport = async (_req, res, next) => {
  try {
    const fin = await buildFinanceFeatures();
    const recs = recommendationsForFinance(fin);

    await saveInsight({
      scope: 'finance',
      title: 'Finance Risk & Recommendations',
      message: recs[0],
      score: Math.min(100, Math.round((fin.totalOutstanding / 100000) * 100)), // simple proxy
      tags: ['finance'],
      data: fin
    });

    res.json({ overview: fin, recommendations: recs });
  } catch (e) {
    next(e);
  }
};

// POST /api/ai/decision-support/ack/:insightId
exports.acknowledgeInsight = async (req, res, next) => {
  try {
    const DecisionInsight = require('../models/decisionInsightModel');
    const { insightId } = req.params;
    const userId = req.user?._id; // optional if you have auth middleware
    const updated = await DecisionInsight.findByIdAndUpdate(
      insightId,
      { acknowledged: true, acknowledgedBy: userId, acknowledgedAt: new Date() },
      { new: true }
    );
    res.json({ message: 'Insight acknowledged', updated });
  } catch (e) {
    next(e);
  }
};

// GET /api/ai/decision-support/insights?scope=student|finance&limit=50
exports.listInsights = async (req, res, next) => {
  try {
    const DecisionInsight = require('../models/decisionInsightModel');
    const { scope, limit = 50 } = req.query;
    const q = {};
    if (scope) q.scope = scope;
    const items = await DecisionInsight.find(q).sort({ createdAt: -1 }).limit(Number(limit));
    res.json({ count: items.length, items });
  } catch (e) {
    next(e);
  }
};
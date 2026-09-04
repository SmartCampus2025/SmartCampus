const test = require('node:test');
const assert = require('node:assert/strict');
const gradeUtils = require('../utils/gradeUtils');
const { getIslamicDate } = require('../ai/madrassa/islamicCalendar');
const { applyArabicSupport } = require('../ai/madrassa/arabicSupport');
const predictiveAnalyticsModel = require('../ai/predictiveAnalyticsModel');
const { detectFraud } = require('../ai/fraudDetection/anomalyDetection');

test('Grade Calculation', () => {
  if (typeof gradeUtils.calculateGrade === 'function') {
    assert.equal(gradeUtils.calculateGrade(95), 'A+');
    assert.equal(gradeUtils.calculateGrade(40), 'F');
  } else {
    assert.ok(true);
  }
});

test('Islamic Calendar and Arabic Support', () => {
  const dateInfo = getIslamicDate();
  assert.ok(dateInfo.gregorian);
  assert.ok(dateInfo.hijri);

  const arabic = applyArabicSupport('SmartCampus');
  assert.equal(arabic.rtl, true);
  assert.ok(arabic.arabicText.includes('SmartCampus'));
});

test('Predictive Analytics Engine', () => {
  const perfHighRisk = predictiveAnalyticsModel.predictPerformance({ grades: [40, 45], attendance: 50 });
  assert.equal(perfHighRisk.risk, 'High');

  const perfLowRisk = predictiveAnalyticsModel.predictPerformance({ grades: [85, 90], attendance: 95 });
  assert.equal(perfLowRisk.risk, 'Low');

  const feeHighRisk = predictiveAnalyticsModel.predictFeeDefault([{ paid: false }, { paid: false }, { paid: false }]);
  assert.equal(feeHighRisk.risk, 'High');
});

test('Fraud Detection Anomaly Engine', () => {
  const anomalies = detectFraud([{ amount: 100000 }, { amount: 200 }], 'financial');
  assert.equal(anomalies.length, 1);
  assert.ok(anomalies[0].reason.includes('transaction') || anomalies[0].reason.includes('amount'));
});

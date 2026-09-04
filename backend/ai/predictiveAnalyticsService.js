// backend/ai/predictiveAnalyticsService.js
const PredictiveAnalyticsModel = require("./predictiveAnalyticsModel");

class PredictiveAnalyticsService {
    analyzeStudentPerformance(studentData) {
        return PredictiveAnalyticsModel.predictPerformance(studentData);
    }

    analyzeFeeDefault(paymentHistory) {
        return PredictiveAnalyticsModel.predictFeeDefault(paymentHistory);
    }
}

module.exports = new PredictiveAnalyticsService();



const { emitEvent } = require('../ai/events/eventBus');
if (prediction.risk === 'High') {
  emitEvent('LOW_ATTENDANCE', { name, email, phone, attendance: 55, subject: 'Multiple' });
}
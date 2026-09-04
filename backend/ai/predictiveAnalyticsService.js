// backend/ai/predictiveAnalyticsService.js
const PredictiveAnalyticsModel = require('./predictiveAnalyticsModel');
const { emitEvent } = require('./events/eventBus');

class PredictiveAnalyticsService {
    analyzeStudentPerformance(studentData) {
        const prediction = PredictiveAnalyticsModel.predictPerformance(studentData);
        if (prediction && prediction.risk === 'High') {
            try {
                emitEvent('LOW_ATTENDANCE', {
                    name: studentData.name || 'Student',
                    email: studentData.email || '',
                    phone: studentData.phone || '',
                    attendance: studentData.attendance || 0,
                    subject: 'Multiple'
                });
            } catch (e) {
                console.warn('Event emit warning:', e.message);
            }
        }
        return prediction;
    }

    analyzeFeeDefault(paymentHistory) {
        return PredictiveAnalyticsModel.predictFeeDefault(paymentHistory);
    }
}

module.exports = new PredictiveAnalyticsService();

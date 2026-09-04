// backend/ai/predictiveAnalyticsController.js
const PredictiveAnalyticsService = require("./predictiveAnalyticsService");

exports.getPerformancePrediction = (req, res) => {
    try {
        const studentData = req.body; // { grades: [..], attendance: 75 }
        const prediction = PredictiveAnalyticsService.analyzeStudentPerformance(studentData);
        res.json({ success: true, prediction });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getFeeDefaultPrediction = (req, res) => {
    try {
        const paymentHistory = req.body; // [{ month: "Jan", paid: true }, ...]
        const prediction = PredictiveAnalyticsService.analyzeFeeDefault(paymentHistory);
        res.json({ success: true, prediction });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
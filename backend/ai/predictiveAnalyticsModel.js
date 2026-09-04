// backend/ai/predictiveAnalyticsModel.js

/**
 * Predictive Analytics Model
 * Computes student performance/dropout risk and fee default probability.
 */

class PredictiveAnalyticsModel {
    // Predict student performance based on grades, attendance, and activities
    predictPerformance(studentData = {}) {
        const grades = Array.isArray(studentData.grades) && studentData.grades.length > 0 ? studentData.grades : [75];
        const avgGrade = grades.reduce((a, b) => a + b, 0) / grades.length;
        const attendanceRate = typeof studentData.attendance === 'number' ? studentData.attendance : 85;

        // Weighted Risk Score (0 - 100)
        const academicDeficit = Math.max(0, 100 - avgGrade);
        const attendanceDeficit = Math.max(0, 100 - attendanceRate);
        const riskScore = (academicDeficit * 0.6) + (attendanceDeficit * 0.4);

        if (riskScore >= 40 || avgGrade < 55 || attendanceRate < 65) {
            return {
                risk: "High",
                score: Math.round(riskScore),
                avgGrade: Math.round(avgGrade),
                attendanceRate,
                message: "Student is at elevated risk of academic failure or dropout. Immediate mentoring advised."
            };
        } else if (riskScore >= 20 || avgGrade < 70) {
            return {
                risk: "Medium",
                score: Math.round(riskScore),
                avgGrade: Math.round(avgGrade),
                attendanceRate,
                message: "Student performance showing moderate decline. Periodic monitoring recommended."
            };
        } else {
            return {
                risk: "Low",
                score: Math.round(riskScore),
                avgGrade: Math.round(avgGrade),
                attendanceRate,
                message: "Student performing consistently with strong academic and attendance metrics."
            };
        }
    }

    // Predict fee default risk based on payment history trends
    predictFeeDefault(paymentHistory = []) {
        if (!Array.isArray(paymentHistory) || paymentHistory.length === 0) {
            return { risk: "Low", defaultProbability: "5%", message: "No default risk detected." };
        }

        const unpaidCount = paymentHistory.filter(p => p && p.paid === false).length;
        const totalRecords = paymentHistory.length;
        const defaultRate = (unpaidCount / totalRecords) * 100;

        if (unpaidCount >= 2 || defaultRate >= 50) {
            return {
                risk: "High",
                unpaidCount,
                defaultProbability: `${Math.round(defaultRate)}%`,
                message: "High risk of fee default. Recommend issuing automated SMS/email payment reminder."
            };
        } else if (unpaidCount === 1) {
            return {
                risk: "Medium",
                unpaidCount,
                defaultProbability: `${Math.round(defaultRate)}%`,
                message: "Moderate risk of delayed fee payment. Soft reminder suggested."
            };
        }

        return {
            risk: "Low",
            unpaidCount: 0,
            defaultProbability: "2%",
            message: "Strong payment history with no fee default risk."
        };
    }
}

module.exports = new PredictiveAnalyticsModel();

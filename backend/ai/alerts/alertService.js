// backend/ai/alerts/alertService.js
const nodemailer = require('nodemailer');

class AlertService {
  async sendEmail(to, subject, text) {
    console.log(`[AlertService Email] To: ${to} | Subject: ${subject} | ${text}`);
    return true;
  }
}

module.exports = new AlertService();

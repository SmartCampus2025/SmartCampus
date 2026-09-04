// ai/alerts/alertConfig.js
export default {
  channels: {
    sms: true,
    email: true,
    whatsapp: true
  },
  thresholds: {
    feeDueDays: 3, // alert if due date within 3 days
    lowAttendance: 60, // alert if attendance < 60%
    dbError: true, // always alert for db errors
  },
  sms: {
    providerApiKey: process.env.SMS_API_KEY,
    senderId: "SmartCampus"
  },
  email: {
    smtpHost: process.env.SMTP_HOST,
    smtpPort: 587,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  whatsapp: {
    providerApiKey: process.env.WHATSAPP_API_KEY
  }
};

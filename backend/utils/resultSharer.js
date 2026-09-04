// Dummy function placeholders – replace with actual SMS/email integrations later
const sendSMS = (phone, message) => {
  console.log(`📲 SMS sent to ${phone}: ${message}`);
};

const sendEmail = (email, subject, message) => {
  console.log(`📧 Email sent to ${email}: ${subject} - ${message}`);
};

const sendWhatsApp = (phone, message) => {
  console.log(`🟢 WhatsApp message to ${phone}: ${message}`);
};

function shareResult(student, result) {
  const message = `Result for ${student.name}:\n` +
    `Total: ${result.total}/${result.total}\n` +
    `Percentage: ${result.percentage}%\n` +
    `Grade: ${result.grade}\n` +
    `Position: ${result.position}`;

  if (student.phone) sendSMS(student.phone, message);
  if (student.email) sendEmail(student.email, "Exam Result", message);
  if (student.phone) sendWhatsApp(student.phone, message); // optional

  return true;
}

module.exports = shareResult;
// backend/services/marksheetService.js
const PDFDocument = require("pdfkit");

exports.share = async ({ studentId, examId, channels, recipients, sharedBy }) => {
  return { success: true, message: "Marksheet shared", studentId, examId };
};

exports.getPdfBuffer = async (studentId, examId) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.fontSize(20).text("SmartCampus Marksheet", 100, 100);
    doc.end();
  });
};

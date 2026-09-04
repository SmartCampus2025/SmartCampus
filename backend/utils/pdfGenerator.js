const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateAttendancePDF = (studentName, records, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(18).text(`Attendance Report for ${studentName}`, { align: 'center' });
    doc.moveDown();

    records.forEach((rec) => {
      doc.fontSize(12).text(`Date: ${new Date(rec.date).toDateString()}, Subject: ${rec.subject}, Status: ${rec.status}`);
    });

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};

module.exports = generateAttendancePDF;
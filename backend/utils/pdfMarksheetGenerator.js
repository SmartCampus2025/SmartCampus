const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateMarksheetPDF = async (studentName, results, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text(`Marksheet: ${studentName}`, { align: 'center' });
  doc.moveDown();

  results.forEach((result, index) => {
    doc.fontSize(12).text(
      `${index + 1}. Subject: ${result.subject}, Marks: ${result.marks}, Grade: ${result.grade}`
    );
  });

  doc.end();
};

module.exports = generateMarksheetPDF;
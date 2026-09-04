const ParentAccess = require('../models/parentAccessModel');
const Attendance = require('../models/attendanceModel');
const Result = require('../models/resultModel');
const generateMarksheetPDF = require('../utils/pdfMarksheetGenerator');

// Register parent
exports.registerParent = async (req, res) => {
  try {
    const parent = await ParentAccess.create(req.body);
    res.status(201).json(parent);
  } catch (err) {
    res.status(500).json({ message: 'Failed to register parent' });
  }
};

// View student's attendance
exports.viewAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const attendance = await Attendance.find({ studentId });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch attendance' });
  }
};

// View student's results
exports.viewResults = async (req, res) => {
  try {
    const { studentId } = req.params;
    const results = await Result.find({ studentId });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch results' });
  }
};

// Download student marksheet PDF
exports.downloadMarksheet = async (req, res) => {
  try {
    const { studentId, studentName } = req.query;
    const results = await Result.find({ studentId });
    const filePath = `./marksheet_${studentId}.pdf`;

    await generateMarksheetPDF(studentName, results, filePath);
    res.download(filePath);
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate marksheet' });
  }
};
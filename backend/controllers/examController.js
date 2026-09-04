const Exam = require('../models/examModel');
const Result = require('../models/resultModel');

// Create exam
exports.createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create exam' });
  }
};

// Add result
exports.addResult = async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add result' });
  }
};

// View results by class
exports.getResultsByClass = async (req, res) => {
  try {
    const { className } = req.params;
    const exams = await Exam.find({ className });
    const examIds = exams.map(e => e._id);

    const results = await Result.find({ examId: { $in: examIds } }).populate('studentId examId');
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch results' });
  }
};

// View student result
exports.getStudentResults = async (req, res) => {
  try {
    const { studentId } = req.params;
    const results = await Result.find({ studentId }).populate('examId');
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch student result' });
  }
};
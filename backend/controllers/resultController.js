const Result = require('../models/resultModel');
const { calculateGrade, assignPositions } = require('../utils/resultUtils');

// Submit or update result
exports.submitResult = async (req, res) => {
  try {
    const { studentId, classId, examType, marks } = req.body;

    // Basic self-heal: Check for invalid or missing data
    if (!marks || marks.length === 0) {
      return res.status(400).json({ error: 'Marks data is missing.' });
    }

    let totalObtained = 0;
    let totalMarks = 0;

    marks.forEach((entry) => {
      if (!entry.obtainedMarks || !entry.totalMarks) {
        throw new Error('Invalid marks entry.');
      }
      totalObtained += entry.obtainedMarks;
      totalMarks += entry.totalMarks;
    });

    const percentage = (totalObtained / totalMarks) * 100;
    const grade = calculateGrade(percentage);

    const result = await Result.findOneAndUpdate(
      { studentId, classId, examType },
      {
        studentId,
        classId,
        examType,
        marks,
        totalObtained,
        totalMarks,
        percentage,
        grade,
        status: 'Finalized',
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Result submitted successfully.', result });
  } catch (error) {
    // Self-heal logging
    console.error('[Result Error]', error.message);
    res.status(500).json({ error: 'Failed to process result entry.' });
  }
};

// Auto-rank all students in class after results are finalized
exports.autoRankStudents = async (req, res) => {
  try {
    const { classId, examType } = req.body;

    const results = await Result.find({ classId, examType, status: 'Finalized' });

    if (results.length === 0) {
      return res.status(404).json({ error: 'No results found to rank.' });
    }

    const ranked = assignPositions(results);

    const updatePromises = ranked.map((res) =>
      Result.findByIdAndUpdate(res._id, { position: res.position })
    );

    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Ranking completed successfully.' });
  } catch (error) {
    console.error('[Ranking Error]', error.message);
    res.status(500).json({ error: 'Auto-ranking failed.' });
  }
};

// Get result by student
exports.getStudentResult = async (req, res) => {
  try {
    const { studentId, examType } = req.query;

    const result = await Result.findOne({ studentId, examType }).populate('studentId classId');

    if (!result) return res.status(404).json({ error: 'Result not found.' });

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch result.' });
  }
};
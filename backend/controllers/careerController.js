const Career = require('../models/careerModel');
const Job = require('../models/jobModel');
const Application = require('../models/applicationModel');
const { generateCareerSuggestions } = require('../utils/aiCareerEngine');

// ==========================
// AI Counseling Suggestions
// ==========================

// POST: Save counseling with AI suggestions
exports.saveCounseling = async (req, res) => {
  try {
    const { studentId, interestAreas, grades, counselorNotes } = req.body;

    const suggestions = generateCareerSuggestions(interestAreas, grades);

    const career = new Career({
      studentId,
      interestAreas,
      grades,
      counselorNotes,
      suggestedFields: suggestions
    });

    await career.save();
    res.status(201).json({ message: 'Counseling saved with AI suggestions', data: career });
  } catch (err) {
    console.error('Error saving counseling:', err);
    res.status(500).json({ message: 'Failed to save career counseling' });
  }
};

// GET: Get AI counseling result for a student
exports.getCounseling = async (req, res) => {
  try {
    const { studentId } = req.params;
    const counseling = await Career.findOne({ studentId });

    if (!counseling) {
      return res.status(404).json({ message: 'No counseling found for this student' });
    }

    res.json(counseling);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve counseling' });
  }
};

// ==========================
// Job Portal Functionality
// ==========================

// POST: Create job
exports.postJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: 'Job posted successfully', job });
  } catch (err) {
    res.status(500).json({ message: 'Failed to post job' });
  }
};

// GET: Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

// POST: Apply to a job
exports.applyJob = async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json({ message: 'Job application submitted', application });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit application' });
  }
};

// GET: Get applications by student
exports.getStudentApplications = async (req, res) => {
  try {
    const { studentId } = req.params;
    const applications = await Application.find({ studentId }).populate('jobId');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};
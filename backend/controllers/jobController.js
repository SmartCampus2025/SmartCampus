const Job = require('../models/jobModel');
const Application = require('../models/applicationModel');

// Post a job
exports.postJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ message: 'Job posted', job });
  } catch (err) {
    res.status(500).json({ message: 'Failed to post job' });
  }
};

// View all jobs
exports.viewJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

// Apply for job
exports.applyJob = async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json({ message: 'Applied successfully', application });
  } catch (err) {
    res.status(500).json({ message: 'Failed to apply' });
  }
};

// View student's applications
exports.viewApplications = async (req, res) => {
  try {
    const { studentId } = req.params;
    const apps = await Application.find({ studentId }).populate('jobId');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};
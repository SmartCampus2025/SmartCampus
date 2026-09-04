const express = require('express');
const router = express.Router();
const {
  saveCounseling,
  getCounseling,
  postJob,
  getAllJobs,
  applyJob,
  getStudentApplications
} = require('../controllers/careerController');

router.post('/counseling/save', saveCounseling);
router.get('/counseling/:studentId', getCounseling);
router.post('/job/post', postJob);
router.get('/job/all', getAllJobs);
router.post('/job/apply', applyJob);
router.get('/applications/:studentId', getStudentApplications);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  postJob,
  viewJobs,
  applyJob,
  viewApplications
} = require('../controllers/jobController');

router.post('/post', postJob);
router.get('/all', viewJobs);
router.post('/apply', applyJob);
router.get('/applications/:studentId', viewApplications);

module.exports = router;
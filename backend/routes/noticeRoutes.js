const express = require('express');
const router = express.Router();
const {
  addNotice,
  getValidNotices,
  deleteNotice
} = require('../controllers/noticeController');

// Add notice
router.post('/add', addNotice);

// Get valid notices
router.get('/all', getValidNotices);

// Delete notice
router.delete('/:id', deleteNotice);

module.exports = router;
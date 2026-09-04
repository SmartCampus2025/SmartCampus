const express = require('express');
const router = express.Router();
const syllabusController = require('../controllers/syllabusController');

// Routes
router.post('/', syllabusController.createSyllabus);
router.get('/', syllabusController.getAllSyllabi);
router.get('/:id', syllabusController.getSyllabusById);
router.put('/:id', syllabusController.updateSyllabus);
router.delete('/:id', syllabusController.deleteSyllabus);

module.exports = router;
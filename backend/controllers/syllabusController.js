const Syllabus = require('../models/syllabusModel');

// Create syllabus
exports.createSyllabus = async (req, res) => {
  try {
    const syllabus = await Syllabus.create(req.body);
    res.status(201).json(syllabus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all syllabi
exports.getAllSyllabi = async (req, res) => {
  try {
    const syllabi = await Syllabus.find()
      .populate('classId')
      .populate('subjectId')
      .populate('uploadedBy');
    res.status(200).json(syllabi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get syllabus by ID
exports.getSyllabusById = async (req, res) => {
  try {
    const syllabus = await Syllabus.findById(req.params.id)
      .populate('classId')
      .populate('subjectId')
      .populate('uploadedBy');
    if (!syllabus) return res.status(404).json({ message: 'Syllabus not found' });
    res.status(200).json(syllabus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update syllabus
exports.updateSyllabus = async (req, res) => {
  try {
    const syllabus = await Syllabus.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!syllabus) return res.status(404).json({ message: 'Syllabus not found' });
    res.status(200).json(syllabus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete syllabus
exports.deleteSyllabus = async (req, res) => {
  try {
    const syllabus = await Syllabus.findByIdAndDelete(req.params.id);
    if (!syllabus) return res.status(404).json({ message: 'Syllabus not found' });
    res.status(200).json({ message: 'Syllabus deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
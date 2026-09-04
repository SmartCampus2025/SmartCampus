const Transport = require('../models/transportModel');

// Add a new bus
exports.addTransport = async (req, res) => {
  try {
    const bus = await Transport.create(req.body);
    res.status(201).json(bus);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add transport' });
  }
};

// Assign student to a bus
exports.assignStudent = async (req, res) => {
  try {
    const { transportId, studentId } = req.body;
    const bus = await Transport.findById(transportId);

    if (!bus) return res.status(404).json({ message: 'Bus not found' });

    if (bus.students.includes(studentId)) {
      return res.status(400).json({ message: 'Student already assigned' });
    }

    bus.students.push(studentId);
    await bus.save();

    res.json({ message: 'Student assigned to transport', bus });
  } catch (err) {
    res.status(500).json({ message: 'Failed to assign student' });
  }
};

// Get all transport units
exports.getAllTransports = async (req, res) => {
  try {
    const transports = await Transport.find().populate('students');
    res.json(transports);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transport list' });
  }
};

// Get a transport by ID
exports.getTransportById = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id).populate('students');
    if (!transport) return res.status(404).json({ message: 'Not found' });
    res.json(transport);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transport' });
  }
};
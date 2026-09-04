const Hostel = require('../models/hostelModel');

// Add a room
exports.addRoom = async (req, res) => {
  try {
    const room = await Hostel.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add room' });
  }
};

// Assign room to student
exports.assignRoom = async (req, res) => {
  try {
    const { roomId, studentId } = req.body;
    const room = await Hostel.findById(roomId);

    if (room.isFull) {
      return res.status(400).json({ message: 'Room is already full' });
    }

    if (room.occupants.includes(studentId)) {
      return res.status(400).json({ message: 'Student already assigned to this room' });
    }

    room.occupants.push(studentId);
    if (room.occupants.length >= room.capacity) {
      room.isFull = true;
    }

    await room.save();
    res.json({ message: 'Student assigned to room', room });
  } catch (err) {
    res.status(500).json({ message: 'Failed to assign room' });
  }
};

// View available rooms
exports.availableRooms = async (req, res) => {
  try {
    const rooms = await Hostel.find({ isFull: false });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch rooms' });
  }
};

// View all rooms
exports.allRooms = async (req, res) => {
  try {
    const rooms = await Hostel.find().populate('occupants');
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all rooms' });
  }
};
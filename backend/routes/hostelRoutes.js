const express = require('express');
const router = express.Router();
const {
  addRoom,
  assignRoom,
  availableRooms,
  allRooms
} = require('../controllers/hostelController');

// Add new room
router.post('/add', addRoom);

// Assign student to room
router.post('/assign', assignRoom);

// View available rooms
router.get('/available', availableRooms);

// View all rooms
router.get('/all', allRooms);

module.exports = router;
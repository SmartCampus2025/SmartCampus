const mongoose = require('mongoose');

const issuedBookSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  issuedDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: Date,
  isReturned: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('IssuedBook', issuedBookSchema);
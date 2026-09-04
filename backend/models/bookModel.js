const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  subject: String,
  isbn: String,
  status: { type: String, enum: ['Available', 'Issued'], default: 'Available' },
  issuedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  issuedDate: Date,
  dueDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
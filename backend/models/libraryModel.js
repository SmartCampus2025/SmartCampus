const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  bookTitle: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  category: { type: String },
  status: {
    type: String,
    enum: ["available", "issued", "reserved", "lost"],
    default: "available",
  },
  issuedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    default: null,
  },
  issuedDate: { type: Date },
  dueDate: { type: Date },
  returnDate: { type: Date },
  fine: { type: Number, default: 0 },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Library", librarySchema);
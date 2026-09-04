const Library = require("../models/libraryModel");
const { sendError } = require("../utils/errorHandler");

exports.addBook = async (req, res) => {
  try {
    const newBook = await Library.create(req.body);
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    sendError(res, error, "Failed to add book");
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Library.find();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    sendError(res, error, "Failed to fetch books");
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    sendError(res, error, "Error retrieving book");
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updated = await Library.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    sendError(res, error, "Error updating book");
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Library.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ success: true, message: "Book deleted" });
  } catch (error) {
    sendError(res, error, "Failed to delete book");
  }
};
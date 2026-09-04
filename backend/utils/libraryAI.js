const Book = require('../models/bookModel');

exports.smartSearchBooks = async (query) => {
  const regex = new RegExp(query, 'i');

  const books = await Book.find({
    $or: [
      { title: { $regex: regex } },
      { author: { $regex: regex } },
      { subject: { $regex: regex } }
    ]
  });

  return books;
};
const Book = require('../models/bookModel');

exports.runLibrarySelfHeal = async () => {
  const fixes = {
    duplicatesRemoved: 0,
    orphanedIssuedToCleared: 0,
    invalidStatusesCorrected: 0
  };

  const books = await Book.find();

  // Remove duplicate ISBN entries
  const seen = new Set();
  for (const book of books) {
    if (book.isbn && seen.has(book.isbn)) {
      await Book.findByIdAndDelete(book._id);
      fixes.duplicatesRemoved++;
    } else {
      seen.add(book.isbn);
    }

    // Orphaned issuedTo check
    if (book.status === 'Issued' && !book.issuedTo) {
      book.status = 'Available';
      book.issuedDate = null;
      book.dueDate = null;
      fixes.orphanedIssuedToCleared++;
      await book.save();
    }

    // Invalid status fix
    if (!['Issued', 'Available'].includes(book.status)) {
      book.status = 'Available';
      fixes.invalidStatusesCorrected++;
      await book.save();
    }
  }

  return fixes;
};
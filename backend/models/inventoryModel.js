const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  category: String,
  location: String,
  addedOn: Date,
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
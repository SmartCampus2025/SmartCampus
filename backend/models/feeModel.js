const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  class: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  dueDate: { type: Date, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'Bank Transfer', 'Online'], default: 'Cash' },
  status: { type: String, enum: ['Unpaid', 'Partially Paid', 'Paid'], default: 'Unpaid' },
}, { timestamps: true });

feeSchema.pre('save', function (next) {
  if (this.paidAmount === 0) this.status = 'Unpaid';
  else if (this.paidAmount < this.totalAmount) this.status = 'Partially Paid';
  else this.status = 'Paid';
  next();
});

module.exports = mongoose.model('Fee', feeSchema);
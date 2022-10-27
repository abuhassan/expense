const mongoose = require('mongoose')

const voucherSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    voucherType: {
      type: String,
      required: [true, 'please add voucherType: Income or Expense'],
      enum: ['income', 'expense'],
    },
    description: {
      type: String,
      required: [true, 'Please enter a description of the voucher'],
    },
    account: {
      type: String,
      required: [
        true,
        'Please select which account should this voucher be recorded under',
      ],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Voucher', voucherSchema)

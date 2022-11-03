const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Note = require('../models/noteModel')
const Voucher = require('../models/voucherModel')

// @desc Get notes for a voucher
// @route GET /api/vouchers/:voucherId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const voucher = await Voucher.findById(req.params.voucherId)

  if (voucher.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const notes = await Note.find({ voucher: req.params.voucherId })

  res.status(200).json(notes)
})

// @desc Create voucher note
// @route POST /api/vouchers/:voucherId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const voucher = await Voucher.findById(req.params.voucherId)

  if (voucher.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const notes = await Note.create({
    text: req.body.text,
    isStaff: false,
    voucher: req.params.voucherId,
    user: req.user.id,
  })

  res.status(200).json(notes)
})

module.exports = {
  getNotes,
  addNote,
}

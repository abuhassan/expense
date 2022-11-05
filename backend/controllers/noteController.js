const asyncHandler = require('express-async-handler')

const Note = require('../models/noteModel')
const Voucher = require('../models/voucherModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc Get notes for a voucher
// @route GET /api/vouchers/:voucherId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
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
  const voucher = await Voucher.findById(req.params.voucherId)

  if (voucher.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    voucher: req.params.voucherId,
    user: req.user.id,
  })

  res.status(200).json(note)
})

module.exports = {
  getNotes,
  addNote,
}

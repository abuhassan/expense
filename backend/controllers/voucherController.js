const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Voucher = require('../models/voucherModel')

// @desc Get user vouchers
// @route GET /api/vouchers
// @access Private
const getVouchers = asyncHandler(async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const vouchers = await Voucher.find({ user: req.user.id })

  res.status(200).json(vouchers)
})

// @desc Get user voucher
// @route /api/vouchers/:id
// @access Private
const getVoucher = asyncHandler(async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const voucher = await Voucher.findById(req.params.id)

  if (!voucher) {
    res.status(404)
    throw new Error('Voucher not found')
  }

  if (voucher.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(voucher)
})

// @desc Create user voucher
// @route POST /api/vouchers
// @access Private
const createVoucher = asyncHandler(async (req, res) => {
  const { voucherType, description, account } = req.body

  if (!voucherType || !description || !account) {
    res.status(400)
    throw new Error('Please add VoucherType and description and account')
  }

  // Get user using the id in JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const voucher = await Voucher.create({
    voucherType,
    description,
    account,
    user: req.user.id,
    status: 'new',
  })

  res.status(201).json(voucher)
})

// @desc Delete voucher
// @route DELETE /api/vouchers/:id
// @access Private
const deleteVoucher = asyncHandler(async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const voucher = await Voucher.findById(req.params.id)

  if (!voucher) {
    res.status(404)
    throw new Error('Voucher not found')
  }

  if (voucher.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await voucher.remove()

  res.status(200).json({ success: true })
})

// @desc Update voucher
// @route PUT /api/vouchers/:id
// @access Private
const updateVoucher = asyncHandler(async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const voucher = await Voucher.findById(req.params.id)

  if (!voucher) {
    res.status(404)
    throw new Error('Voucher not found')
  }

  if (voucher.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedVoucher = await Voucher.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedVoucher)
})

module.exports = {
  getVouchers,
  getVoucher,
  createVoucher,
  deleteVoucher,
  updateVoucher,
}

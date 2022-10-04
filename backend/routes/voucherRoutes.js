const express = require('express')
const router = express.Router()
const {
  getVouchers,
  getVoucher,
  createVoucher,
  deleteVoucher,
  updateVoucher,
} = require('../controllers/voucherController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getVouchers).post(protect, createVoucher)
router
  .route('/:id')
  .get(protect, getVoucher)
  .delete(protect, deleteVoucher)
  .put(protect, updateVoucher)

module.exports = router

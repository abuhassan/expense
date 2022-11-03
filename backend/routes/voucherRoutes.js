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

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:voucherId/notes', noteRouter)

router.route('/').get(protect, getVouchers).post(protect, createVoucher)

router
  .route('/:id')
  .get(protect, getVoucher)
  .delete(protect, deleteVoucher)
  .put(protect, updateVoucher)

module.exports = router

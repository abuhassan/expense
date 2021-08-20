import express from 'express'
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
} from '../controllers/transactions.js'
const router = express.Router()

router.route('/').get(getTransactions).post(addTransaction)

router.route('/:id').delete(deleteTransaction)

export default router

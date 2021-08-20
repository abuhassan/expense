//@desc Get all transactions
//@route GET /api/v1/transactions
//@ public
const getTransactions = (req, res, next) => {
  res.send('GET transactions')
}
//@desc Add transaction
//@route POST /api/v1/transactions
//@ public
const addTransaction = (req, res, next) => {
  res.send('POST transaction')
}
//@desc Delete transaction
//@route DELETE /api/v1/transactions/:id
//@ public
const deleteTransaction = (req, res, next) => {
  res.send('DELETE transaction')
}

export { getTransactions, addTransaction, deleteTransaction }

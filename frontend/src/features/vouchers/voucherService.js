import axios from 'axios'

const API_URL = '/api/vouchers/'

// Create new voucher
const createVoucher = async (voucherData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, voucherData, config)

  return response.data
}

// Get user vouchers
const getVouchers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Get user voucher
const getVoucher = async (voucherId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + voucherId, config)

  return response.data
}

// Close voucher
const closeVoucher = async (voucherId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    API_URL + voucherId,
    { status: 'closed' },
    config
  )

  return response.data
}

const voucherService = {
  createVoucher,
  getVouchers,
  getVoucher,
  closeVoucher,
}

export default voucherService

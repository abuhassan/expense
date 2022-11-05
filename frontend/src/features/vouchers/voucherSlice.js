import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import voucherService from './voucherService'
import { extractErrorMessage } from '../../utils'

const initialState = {
  vouchers: null,
  voucher: null,
}

// Create new voucher
export const createVoucher = createAsyncThunk(
  'vouchers/create',
  async (voucherData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await voucherService.createVoucher(voucherData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Get user vouchers
export const getVouchers = createAsyncThunk(
  'vouchers/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await voucherService.getVouchers(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Get user voucher
export const getVoucher = createAsyncThunk(
  'vouchers/get',
  async (voucherId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await voucherService.getVoucher(voucherId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Close voucher
export const closeVoucher = createAsyncThunk(
  'vouchers/close',
  async (voucherId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await voucherService.closeVoucher(voucherId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const voucherSlice = createSlice({
  name: 'voucher',
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(getVouchers.pending, (state) => {
        state.voucher = null
      })
      .addCase(getVouchers.fulfilled, (state, action) => {
        state.vouchers = action.payload
      })
      .addCase(getVoucher.fulfilled, (state, action) => {
        state.voucher = action.payload
      })
      .addCase(closeVoucher.fulfilled, (state, action) => {
        state.voucher = action.payload
        state.vouchers = state.vouchers.map((voucher) =>
          voucher._id === action.payload._id ? action.payload : voucher
        )
      })
  },
})

export default voucherSlice.reducer

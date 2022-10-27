import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import voucherService from './voucherService'

const initialState = {
  vouchers: [],
  voucher: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new voucher
export const createVoucher = createAsyncThunk(
  'vouchers/create',
  async (voucherData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await voucherService.createVoucher(voucherData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
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
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
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
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
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
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const voucherSlice = createSlice({
  name: 'voucher',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVoucher.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createVoucher.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createVoucher.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getVouchers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getVouchers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.vouchers = action.payload
      })
      .addCase(getVouchers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getVoucher.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getVoucher.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.voucher = action.payload
      })
      .addCase(getVoucher.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(closeVoucher.fulfilled, (state, action) => {
        state.isLoading = false
        state.vouchers.map((voucher) =>
          voucher.id === action.payload.id
            ? (voucher.status = 'closed')
            : voucher
        )
      })
  },
})

export const { reset } = voucherSlice.actions
export default voucherSlice.reducer

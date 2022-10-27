import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import voucherReducer from '../features/vouchers/voucherSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vouchers: voucherReducer,
  },
})

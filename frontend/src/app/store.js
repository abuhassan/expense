import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import voucherReducer from '../features/vouchers/voucherSlice'
import noteReducer from '../features/notes/noteSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vouchers: voucherReducer,
    notes: noteReducer,
  },
})

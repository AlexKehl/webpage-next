import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import paymentSlice from './slices/paymentSlice'

export const store = configureStore({
  reducer: {
    payment: paymentSlice,
    cart: cartSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

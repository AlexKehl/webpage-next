import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import { serverApi } from './services/serverApi'
import stepperSlice from './slices/stepperSlice'
import toastSlice from './slices/toastSlice'

export const store = configureStore({
  reducer: {
    [serverApi.reducerPath]: serverApi.reducer,
    cart: cartSlice,
    stepper: stepperSlice,
    toast: toastSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serverApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

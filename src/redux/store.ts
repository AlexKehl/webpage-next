import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import { serverApi } from './services/serverApi'
import stepperSlice from './slices/stepperSlice'
import gallerySlice from './slices/gallerySlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    [serverApi.reducerPath]: serverApi.reducer,
    cart: cartSlice,
    stepper: stepperSlice,
    gallery: gallerySlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      serverApi.middleware
    ),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

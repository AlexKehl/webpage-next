import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import { serverApi } from './services/serverApi'
import stepperSlice from './slices/stepperSlice'
import gallerySlice from './slices/gallerySlice'
import userSlice from './slices/userSlice'
import { BuyImageDto } from 'common/interface/Dto'

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

export const buyImageSelector = (state: RootState): BuyImageDto => ({
  ids: state.cart.cart.items.map((item) => item.id),
  email: state.user.user?.email!,
  address: state.stepper.address!,
  contact: state.stepper.contact!,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

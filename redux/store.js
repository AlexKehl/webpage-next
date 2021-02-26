import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './slices/counterSlice'
import galleryReducer from './slices/gallerySlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    gallery: galleryReducer,
  },
  devTools: true,
})

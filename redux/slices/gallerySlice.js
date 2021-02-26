import { createSlice } from '@reduxjs/toolkit'

const reducers = {
  setCurrentImage: ({ ...state }, { payload }) => ({
    ...state,
    currentImage: payload,
  }),
  openLightbox: ({ ...state }, { payload }) => ({
    ...state,
    currentImage: payload.index,
    isViewerOpen: true,
  }),
  closeLightbox: ({ ...state }) => ({
    ...state,
    currentImage: 0,
    isViewerOpen: false,
  }),
}

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    currentImage: 0,
    isViewerOpen: false,
  },
  reducers,
})

export const selectIsViewerOpen = (state) => state.gallery.isViewerOpen
export const selectCurrentImage = (state) => state.gallery.currentImage

export const {
  openLightbox,
  closeLightbox,
  setCurrentImage,
} = gallerySlice.actions

export default gallerySlice.reducer

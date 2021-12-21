import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from '../../../common/interface/Constants'
import { API } from '../../constants/EnvProxy'
import { FileWithMeta } from '../../types/GalleryImages'
import { getCyclic } from '../../utils/Functions'
import { serverApi } from '../services/serverApi'
import { RootState } from '../store'
import {
  addGenericToasts,
  addLoadingMatcher,
  WithLoader,
  WithToast,
} from '../utils'

export interface GalleryState extends WithLoader, WithToast {
  images: FileWithMeta[]
  currentImageIdx: number
  isViewerOpen: boolean
  isInfoModalOpen: boolean
}

export const initialState: GalleryState = {
  images: [],
  isLoading: false,
  currentImageIdx: 0,
  isInfoModalOpen: false,
  isViewerOpen: false,
}

const images = serverApi.endpoints.images
const galleryUpload = serverApi.endpoints.galleryUpload
const galleryDelete = serverApi.endpoints.galleryDelete

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    openLightBox: (state, action: PayloadAction<number>) => {
      state.currentImageIdx = action.payload
      state.isViewerOpen = true
    },
    closeLightBox: (state) => {
      state.isViewerOpen = false
    },
    openNextImage: (state) => {
      state.currentImageIdx =
        (state.currentImageIdx + state.images.length + 1) % state.images.length
    },
    openPrevImage: (state) => {
      state.currentImageIdx =
        (state.currentImageIdx + state.images.length - 1) % state.images.length
    },
    openInfoModal: (state, action: PayloadAction<number>) => {
      state.isInfoModalOpen = true
      state.currentImageIdx = action.payload
    },
    closeInfoModal: (state) => {
      state.isInfoModalOpen = false
    },
    addFiles: (
      state,
      action: PayloadAction<{ files: File[]; category: Category }>
    ) => {
      const newFiles: FileWithMeta[] = action.payload.files.map((file) => ({
        file,
        name: '',
        url: '',
        id: '',
        width: 0,
        height: 0,
        category: action.payload.category,
        isForSell: false,
      }))
      state.images = [...state.images, ...newFiles]
    },
  },
  extraReducers: (builder) => {
    addLoadingMatcher<GalleryState>(builder, images)
    addLoadingMatcher<GalleryState>(builder, galleryUpload)
    addLoadingMatcher<GalleryState>(builder, galleryDelete)
    addGenericToasts<GalleryState>(builder, galleryUpload)
    addGenericToasts<GalleryState>(builder, galleryDelete)
    builder.addMatcher(images.matchFulfilled, (state, action) => {
      state.images = action.payload
    })
  },
})

export const gallerySelector = (state: RootState) => state.gallery
export const imageSelector = (state: GalleryState) => {
  const imageUrls = state.images.map((image) => `${API}${image.url}`)
  return {
    nextImageUrl: getCyclic(imageUrls, state.currentImageIdx + 1),
    prevImageUrl: getCyclic(imageUrls, state.currentImageIdx - 1),
    currentImage: state.images[state.currentImageIdx],
    currentImageUrl: imageUrls[state.currentImageIdx],
  }
}
export const galleryActions = gallerySlice.actions
export default gallerySlice.reducer

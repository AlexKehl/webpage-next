import { Reducer, useEffect, useReducer } from 'react'
import { Category } from '../../../common/interface/Constants'
import { ImageForGallery } from '../../../common/interface/ConsumerData'
import { API } from '../../constants/EnvProxy'
import { getGalleryFiles } from '../api/Files'

interface State {
  images: ImageForGallery[]
  currentImageIdx: number
  isViewerOpen: boolean
  isModalOpen: boolean
}

type Action =
  | { type: 'OPEN_LIGHTBOX'; payload: Pick<State, 'currentImageIdx'> }
  | { type: 'CLOSE_LIGHTBOX' }
  | { type: 'OPEN_NEXT_IMAGE' }
  | { type: 'OPEN_PREV_IMAGE' }
  | { type: 'OPEN_MODAL'; payload: Pick<State, 'currentImageIdx'> }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SET_IMAGES'; payload: Pick<State, 'images'> }

const galleryReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'OPEN_LIGHTBOX':
      return {
        ...state,
        currentImageIdx: action.payload.currentImageIdx,
        isViewerOpen: true,
      }
    case 'CLOSE_LIGHTBOX':
      return { ...state, isViewerOpen: false }
    case 'OPEN_NEXT_IMAGE':
      return {
        ...state,
        currentImageIdx:
          (state.currentImageIdx + state.images.length + 1) %
          state.images.length,
      }
    case 'OPEN_PREV_IMAGE':
      return {
        ...state,
        currentImageIdx:
          (state.currentImageIdx + state.images.length - 1) %
          state.images.length,
      }
    case 'OPEN_MODAL':
      return {
        ...state,
        isModalOpen: true,
        currentImageIdx: action.payload.currentImageIdx,
      }
    case 'CLOSE_MODAL':
      return { ...state, isModalOpen: false }
    case 'SET_IMAGES':
      return { ...state, images: action.payload.images }
    default:
      throw new Error('Unsupported Action in galleryReducer')
  }
}

const useGallery = (category: Category) => {
  useEffect(() => {
    getGalleryFiles(category).then((images) =>
      dispatch({ type: 'SET_IMAGES', payload: { images } })
    )
  }, [category])

  const [state, dispatch] = useReducer(galleryReducer, {
    currentImageIdx: 0,
    isViewerOpen: false,
    isModalOpen: false,
    images: [],
  })

  const imageUrls = state.images.map((image) => `${API}${image.url}`)

  const nextImageUrl = imageUrls[(state.currentImageIdx + 1) % imageUrls.length]
  const prevImageUrl = imageUrls[(state.currentImageIdx - 1) % imageUrls.length]
  const currentImage = state.images[state.currentImageIdx]

  return {
    state,
    dispatch,
    imageUrls,
    currentImageUrl: imageUrls[state.currentImageIdx],
    nextImageUrl,
    prevImageUrl,
    currentImage,
  }
}

export default useGallery

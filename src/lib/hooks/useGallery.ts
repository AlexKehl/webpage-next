import { Reducer, useReducer } from 'react'
import { ImageForGallery } from '../../../common/interface/ConsumerData'
import { API } from '../../constants/EnvProxy'

interface State {
  currentImageIdx: number
  isViewerOpen: boolean
  isModalOpen: boolean
  imagesLength: number
}

type Action =
  | { type: 'OPEN_LIGHTBOX'; payload: Pick<State, 'currentImageIdx'> }
  | { type: 'CLOSE_LIGHTBOX' }
  | { type: 'OPEN_NEXT_IMAGE' }
  | { type: 'OPEN_PREV_IMAGE' }
  | { type: 'OPEN_MODAL'; payload: Pick<State, 'currentImageIdx'> }
  | { type: 'CLOSE_MODAL' }

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
          (state.currentImageIdx + state.imagesLength + 1) % state.imagesLength,
      }
    case 'OPEN_PREV_IMAGE':
      return {
        ...state,
        currentImageIdx:
          (state.currentImageIdx + state.imagesLength - 1) % state.imagesLength,
      }
    case 'OPEN_MODAL':
      return {
        ...state,
        isModalOpen: true,
        currentImageIdx: action.payload.currentImageIdx,
      }
    case 'CLOSE_MODAL':
      return { ...state, isModalOpen: false }
    default:
      throw new Error('Unsupported Action in galleryReducer')
  }
}

const useGallery = (images: ImageForGallery[]) => {
  console.log(API)
  const imageUrls = images.map((image) => `${API}/${image.url}`)

  const [state, dispatch] = useReducer(galleryReducer, {
    currentImageIdx: 0,
    isViewerOpen: false,
    isModalOpen: false,
    imagesLength: images.length,
  })

  const nextImageUrl = imageUrls[(state.currentImageIdx + 1) % imageUrls.length]
  const prevImageUrl = imageUrls[(state.currentImageIdx - 1) % imageUrls.length]
  const currentImage = images[state.currentImageIdx]

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

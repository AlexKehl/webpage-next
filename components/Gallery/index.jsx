import { useReducer } from 'react'
import useStyles from './styles'
import Gallery from './Gallery'

const galleryReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LIGHTBOX':
      return {
        ...state,
        currentImage: action.payload.index,
        isViewerOpen: true,
      }
    case 'CLOSE_LIGHTBOX':
      return { ...state, currentImage: 0, isViewerOpen: false }
    case 'SET_CURRENT_IMAGE':
      return { ...state, currentImage: action.payload }
    default:
      throw new Error('unknown Action')
  }
}

const GalleryContainer = ({ photos }) => {
  const classes = useStyles()

  const [state, dispatch] = useReducer(galleryReducer, {
    currentImage: 0,
    isViewerOpen: false,
  })

  const photosSrc = photos.map(({ src }) => src)

  return (
    <Gallery
      photos={photos}
      classes={classes}
      openLightbox={(event, idx) =>
        dispatch({ type: 'OPEN_LIGHTBOX', payload: idx })
      }
      closeLightbox={() => dispatch({ type: 'CLOSE_LIGHTBOX' })}
      isViewerOpen={state.isViewerOpen}
      photosSrc={photosSrc}
      currentImage={state.currentImage}
      setCurrentImage={(idx) =>
        dispatch({ type: 'SET_CURRENT_IMAGE', payload: idx })
      }
    />
  )
}
export default GalleryContainer

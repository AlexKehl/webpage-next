import { useReducer } from 'react'
import Gallery from '@/components/Gallery'
import WithHeader from '@/components/WithHeader'
import CATEGORIES from '@/constants/Categories'
import CATEGORY_PICTURE_MAP from '@/constants/CategoryPictures'
import { generateCategoryPaths } from '@/utils/PathsGenerator.js'

const galleryReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LIGHTBOX':
      return {
        ...state,
        currentImage: action.payload,
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

const GalleryPage = ({ photos }) => {
  const [state, dispatch] = useReducer(galleryReducer, {
    currentImage: 0,
    isViewerOpen: false,
  })

  const photosSrc = photos.map(({ src }) => src)

  return (
    <Gallery
      photos={photos}
      openLightbox={(event, { index }) =>
        dispatch({ type: 'OPEN_LIGHTBOX', payload: index })
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

export const getStaticPaths = async ({ locales }) => ({
  paths: generateCategoryPaths({ locales, categories: CATEGORIES }),
  fallback: false,
})

export const getStaticProps = async ({ params }) => ({
  props: {
    photos: CATEGORY_PICTURE_MAP[params.category],
  },
})

export default WithHeader(GalleryPage)

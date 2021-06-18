import { GetStaticPaths, GetStaticProps } from 'next'
import { FC, Reducer, useReducer } from 'react'
import Gallery from '../../src/components/Gallery'
import WithHeader from '../../src/components/WithHeader'
import CATEGORIES from '../../src/constants/Categories'
import CATEGORY_PICTURE_MAP from '../../src/constants/CategoryPictures'
import { Photo } from '../../src/types'
import { generateCategoryPaths } from '../../src/utils/PathsGenerator'

interface State {
  currentImage: number
  isViewerOpen: boolean
}

interface Props {
  photos: Photo[]
}

interface Action {
  payload?: number
  type: 'OPEN_LIGHTBOX' | 'CLOSE_LIGHTBOX' | 'SET_CURRENT_IMAGE'
}

const galleryReducer: Reducer<State, Action> = (state, action) => {
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

const GalleryPage: FC<Props> = ({ photos }) => {
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

export const getStaticPaths: GetStaticPaths = async ({ locales }) => ({
  paths: generateCategoryPaths({ locales, categories: CATEGORIES }),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    photos: CATEGORY_PICTURE_MAP[params.category],
  },
})

export default WithHeader(GalleryPage)

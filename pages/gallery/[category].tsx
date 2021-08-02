import { GetStaticPaths, GetStaticProps } from 'next'
import { FC, Reducer, useReducer } from 'react'
import Gallery from '../../src/components/Gallery'
import CATEGORIES from '../../src/constants/Categories'
import { getGalleryFiles } from '../../src/lib/api/Files'
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

  const photosUrl = photos.map(({ url }) => url)

  console.log(photos)
  return (
    <Gallery
      photos={photos}
      openLightbox={(event, { index }) =>
        dispatch({ type: 'OPEN_LIGHTBOX', payload: index })
      }
      closeLightbox={() => dispatch({ type: 'CLOSE_LIGHTBOX' })}
      isViewerOpen={state.isViewerOpen}
      photosUrl={photosUrl}
      currentImage={state.currentImage}
      setCurrentImage={(idx) =>
        dispatch({ type: 'SET_CURRENT_IMAGE', payload: idx })
      }
    />
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => ({
  paths: generateCategoryPaths({ locales, categories: CATEGORIES }),
  fallback: true,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const photos = await getGalleryFiles(params.category as string)
  return {
    props: {
      photos,
    },
  }
}

export default GalleryPage

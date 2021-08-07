import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { FC, Reducer, useReducer } from 'react'
import Gallery from './Gallery'
import WithHeader from '../../src/components/HOC/WithHeader'
import CATEGORIES from '../../src/constants/Categories'
import { getGalleryFiles } from '../../src/lib/api/Files'
import useUser from '../../src/lib/hooks/useUser'
import { Category } from '../../src/types'
import { ImageForConsumer } from '../../src/types/ApiResponses'
import { generateCategoryPaths } from '../../src/utils/PathsGenerator'

interface State {
  currentImage: number
  isViewerOpen: boolean
}

interface Props {
  images: ImageForConsumer[]
  category: Category
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
      return { ...state, isViewerOpen: false }
    case 'SET_CURRENT_IMAGE':
      return { ...state, currentImage: action.payload }
    default:
      throw new Error('unknown Action')
  }
}

const GalleryPage: FC<Props> = ({ images, category }) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(galleryReducer, {
    currentImage: 0,
    isViewerOpen: false,
  })
  const { getUser } = useUser()

  return (
    <div>
      <Gallery
        user={getUser()}
        onEdit={() => router.push(`/galleryedit/${category}`)}
        images={images}
        openLightbox={(event, { index }) =>
          dispatch({ type: 'OPEN_LIGHTBOX', payload: index })
        }
        closeLightbox={() => dispatch({ type: 'CLOSE_LIGHTBOX' })}
        isViewerOpen={state.isViewerOpen}
        currentImage={state.currentImage}
        setCurrentImage={(idx) =>
          dispatch({ type: 'SET_CURRENT_IMAGE', payload: idx })
        }
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => ({
  paths: generateCategoryPaths({ locales, categories: CATEGORIES }),
  fallback: true,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const images = await getGalleryFiles(params.category as string)
  return {
    props: {
      images,
      category: params.category as Category,
    },
  }
}

export default WithHeader(GalleryPage)

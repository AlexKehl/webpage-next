import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { FC, Reducer, useReducer } from 'react'
import Gallery from './GalleryView'
import WithHeader from '../../src/components/HOC/WithHeader'
import { getGalleryFiles } from '../../src/lib/api/Files'
import useUser from '../../src/lib/hooks/useUser'
import { generateCategoryPaths } from '../../src/utils/PathsGenerator'
import { ImageForGallery } from '../../common/interface/ConsumerData'
import { Category } from '../../common/interface/Constants'
import Categories from '../../common/constants/Categories'

interface State {
  currentImage?: number
  isViewerOpen: boolean
}

interface Props {
  images: ImageForGallery[]
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
    <Gallery
      user={getUser()}
      onEdit={() => router.push(`/galleryedit/${category}`)}
      images={images}
      openLightbox={(event, { index }) =>
        dispatch({ type: 'OPEN_LIGHTBOX', payload: index })
      }
      closeLightbox={() => dispatch({ type: 'CLOSE_LIGHTBOX' })}
      isViewerOpen={state.isViewerOpen}
      currentImage={state.currentImage || 0}
      setCurrentImage={(idx) =>
        dispatch({ type: 'SET_CURRENT_IMAGE', payload: idx })
      }
    />
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => ({
  paths: generateCategoryPaths({ locales, categories: Categories }),
  fallback: true,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const images = await getGalleryFiles(params?.['category'] as string)
  return {
    props: {
      images,
      category: params?.['category'] as Category,
    },
  }
}

export default WithHeader(GalleryPage)

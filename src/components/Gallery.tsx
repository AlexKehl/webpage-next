import { Button, Flex, useUpdateEffect, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import Lightbox from 'react-image-lightbox'
import { Category } from '../../common/interface/Constants'
import { hasRole } from '../../common/utils/User'
import ImagePresenter from './ImagePresenter'
import useI18n from '../lib/hooks/useI18n'
import GalleryImageInfo from './GalleryImageInfo'
import { EditIcon } from '@chakra-ui/icons'
import { API } from '../constants/EnvProxy'
import { useImagesQuery } from '../redux/services/serverApi'
import {
  imageSelector,
  galleryActions,
  gallerySelector,
} from '../redux/slices/gallerySlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { userSelector } from '../redux/slices/userSlice'

interface Props {
  category: Category
}

const Gallery = ({ category }: Props) => {
  const { t } = useI18n()
  const router = useRouter()
  const state = useAppSelector(gallerySelector)
  const { user } = useAppSelector(userSelector)
  const dispatch = useAppDispatch()
  const { data } = useImagesQuery(category)

  useUpdateEffect(() => {
    dispatch(galleryActions.setImages(data))
  }, [data])

  return (
    <VStack my="3" mx="auto" maxW={{ base: '1', sm: '7xl' }}>
      {hasRole({ user, role: 'Admin' }) && (
        <Button
          w="full"
          variant="ghost"
          onClick={() => router.push(`/galleryedit/${category}`)}
          rightIcon={<EditIcon />}
        >
          {t.edit}
        </Button>
      )}
      <Flex wrap="wrap">
        {state.images.map((image, index) => (
          <ImagePresenter
            key={index}
            src={`${API}${image.url}`}
            onClick={() => dispatch(galleryActions.openLightBox(index))}
            onInfoClick={() => dispatch(galleryActions.openInfoModal(index))}
          />
        ))}
      </Flex>
      {state.isViewerOpen && (
        <Lightbox
          imagePadding={0}
          mainSrc={imageSelector(state).currentImageUrl || ''}
          nextSrc={imageSelector(state).nextImageUrl}
          prevSrc={imageSelector(state).prevImageUrl}
          onCloseRequest={() => dispatch(galleryActions.closeLightBox())}
          onMovePrevRequest={() => dispatch(galleryActions.openPrevImage())}
          onMoveNextRequest={() => dispatch(galleryActions.openNextImage())}
        />
      )}
      {state.images.length > 0 && <GalleryImageInfo />}
    </VStack>
  )
}

export default Gallery

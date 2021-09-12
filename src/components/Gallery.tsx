import { Button, Center, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import Lightbox from 'react-image-lightbox'
import { Category } from '../../common/interface/Constants'
import { ImageForGallery } from '../../common/interface/ConsumerData'
import { hasRole } from '../../common/utils/User'
import WithHeader from './HOC/WithHeader'
import ImagePresenter from './ImagePresenter'
import useUser from '../lib/hooks/useUser'
import useI18n from '../lib/hooks/useI18n'
import useGallery from '../lib/hooks/useGallery'
import GalleryImageInfo from './GalleryImageInfo'

interface Props {
  images?: ImageForGallery[]
  category: Category
}

const Gallery = ({ images = [], category }: Props) => {
  const { t } = useI18n()
  const router = useRouter()
  const { getUser } = useUser()
  const {
    state,
    dispatch,
    nextImageUrl,
    prevImageUrl,
    currentImageUrl,
    currentImage,
  } = useGallery(images)
  const { isViewerOpen, isModalOpen } = state

  return (
    <Center maxW="5xl" mt="3">
      {hasRole({ user: getUser(), role: 'Admin' }) && (
        <Flex flexDirection="row-reverse">
          <Button onClick={() => router.push(`/galleryedit/${category}`)}>
            {t.edit}
          </Button>
        </Flex>
      )}
      <Flex wrap="wrap">
        {images.map((image, index) => (
          <ImagePresenter
            key={index}
            image={image}
            onClick={() =>
              dispatch({
                type: 'OPEN_LIGHTBOX',
                payload: { currentImageIdx: index },
              })
            }
            onInfoClick={() =>
              dispatch({
                type: 'OPEN_MODAL',
                payload: { currentImageIdx: index },
              })
            }
          />
        ))}
      </Flex>
      {isViewerOpen && (
        <Lightbox
          imagePadding={0}
          mainSrc={currentImageUrl || ''}
          nextSrc={nextImageUrl}
          prevSrc={prevImageUrl}
          onCloseRequest={() => dispatch({ type: 'CLOSE_LIGHTBOX' })}
          onMovePrevRequest={() =>
            dispatch({
              type: 'OPEN_PREV_IMAGE',
            })
          }
          onMoveNextRequest={() =>
            dispatch({
              type: 'OPEN_NEXT_IMAGE',
            })
          }
        />
      )}
      {images && images.length > 0 && (
        <GalleryImageInfo
          {...currentImage!}
          isOpen={isModalOpen}
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        />
      )}
    </Center>
  )
}

export default WithHeader(Gallery)

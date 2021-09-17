import { Button, Flex, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import Lightbox from 'react-image-lightbox'
import { Category } from '../../common/interface/Constants'
import { hasRole } from '../../common/utils/User'
import WithHeader from './HOC/WithHeader'
import ImagePresenter from './ImagePresenter'
import useUser from '../lib/hooks/useUser'
import useI18n from '../lib/hooks/useI18n'
import useGallery from '../lib/hooks/useGallery'
import GalleryImageInfo from './GalleryImageInfo'
import { EditIcon } from '@chakra-ui/icons'
import { API } from '../constants/EnvProxy'

interface Props {
  category: Category
}

const Gallery = ({ category }: Props) => {
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
  } = useGallery(category)
  const { isViewerOpen, isModalOpen } = state

  return (
    <VStack my="3" mx="auto" maxW={{ base: '1', sm: '7xl' }}>
      {hasRole({ user: getUser(), role: 'Admin' }) && (
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
      {state.images.length > 0 && (
        <GalleryImageInfo
          {...currentImage!}
          isOpen={isModalOpen}
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        />
      )}
    </VStack>
  )
}

export default WithHeader(Gallery)

import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { FC, Reducer, useReducer } from 'react'
import Lightbox from 'react-image-lightbox'
import { Category } from '../../common/interface/Constants'
import { ImageForGallery } from '../../common/interface/ConsumerData'
import { hasRole } from '../../common/utils/User'
import WithHeader from './HOC/WithHeader'
import ImagePresenter from './ImagePresenter'
import { Texts } from '../constants/Texts'
import useUser from '../lib/hooks/useUser'

interface Props {
  images?: ImageForGallery[]
  category: Category
}

interface State {
  currentImage: number
  isViewerOpen: boolean
  isModalOpen: boolean
}

interface Action {
  payload: number
  type:
    | 'OPEN_LIGHTBOX'
    | 'CLOSE_LIGHTBOX'
    | 'SET_CURRENT_IMAGE'
    | 'OPEN_MODAL'
    | 'CLOSE_MODAL'
}

const galleryReducer: Reducer<State, Action> = (state, action) => {
  const reducerActions: Record<Action['type'], State> = {
    OPEN_LIGHTBOX: {
      ...state,
      currentImage: action.payload,
      isViewerOpen: true,
    },
    CLOSE_LIGHTBOX: { ...state, isViewerOpen: false },
    SET_CURRENT_IMAGE: { ...state, currentImage: action.payload },
    OPEN_MODAL: { ...state, isModalOpen: true, currentImage: action.payload },
    CLOSE_MODAL: { ...state, isModalOpen: false, currentImage: action.payload },
  }
  return reducerActions[action.type]
}

const Gallery: FC<Props> = ({ images = [], category }) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(galleryReducer, {
    currentImage: 0,
    isViewerOpen: false,
    isModalOpen: false,
  })
  const { getUser } = useUser()
  const { isModalOpen, isViewerOpen, currentImage } = state

  const imageUrls = images.map((image) => image.url)

  return (
    <div className="max-w-5xl m-auto mt-3">
      {hasRole({ user: getUser(), role: 'Admin' }) && (
        <div className="flex flex-row-reverse">
          <Button onClick={() => router.push(`/galleryedit/${category}`)}>
            {Texts.edit}
          </Button>
        </div>
      )}
      {images.map((image, index) => (
        <ImagePresenter
          key={index}
          image={image}
          onClick={() => dispatch({ type: 'OPEN_LIGHTBOX', payload: index })}
          onInfoClick={() => dispatch({ type: 'OPEN_MODAL', payload: index })}
        />
      ))}
      {isViewerOpen && (
        <Lightbox
          imagePadding={0}
          mainSrc={imageUrls[currentImage] || ''}
          nextSrc={imageUrls[(currentImage + 1) % imageUrls.length]}
          prevSrc={
            imageUrls[(currentImage + imageUrls.length - 1) % imageUrls.length]
          }
          onCloseRequest={() =>
            dispatch({ type: 'CLOSE_LIGHTBOX', payload: 0 })
          }
          onMovePrevRequest={() =>
            dispatch({
              type: 'SET_CURRENT_IMAGE',
              payload: (currentImage + imageUrls.length - 1) % imageUrls.length,
            })
          }
          onMoveNextRequest={() =>
            dispatch({
              type: 'SET_CURRENT_IMAGE',
              payload: (currentImage + 1) % imageUrls.length,
            })
          }
        />
      )}

      {images && images.length > 0 && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: 0 })}
          size="md"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Info</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Table variant="simple" className="mb-4">
                <Tbody>
                  <Tr>
                    <Td>Name</Td>
                    <Td>{images[currentImage]?.name}</Td>
                  </Tr>
                  <Tr>
                    <Td>Width</Td>
                    <Td>{images[currentImage]?.width} cm</Td>
                  </Tr>
                  <Tr>
                    <Td>Height</Td>
                    <Td>{images[currentImage]?.height} cm</Td>
                  </Tr>
                  <Tr>
                    <Td>Is for sell</Td>
                    <Td>
                      {images[currentImage]?.isForSell ? (
                        <CheckIcon color="green.500" />
                      ) : (
                        <CloseIcon color="red.500" />
                      )}
                    </Td>
                  </Tr>
                  {images[currentImage]?.isForSell && (
                    <Tr>
                      <Td>Price</Td>
                      <Td>{images[currentImage]?.price} Euro</Td>
                    </Tr>
                  )}
                  {images[currentImage]?.description && (
                    <Tr>
                      <Td>Description</Td>
                      <Td>{images[currentImage]?.description}</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}

export default WithHeader(Gallery)

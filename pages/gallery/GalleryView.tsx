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
  useDisclosure,
} from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import Lightbox from 'react-image-lightbox'
import { hasRole } from '../../src/utils/UserUtils'
import ImagePresenter from '../../src/components/ImagePresenter'
import { ImageForGallery } from '../../common/interface/ConsumerData'
import { User } from '../../common/interface/ConsumerResponses'

interface GalleryProps {
  images: ImageForGallery[]
  openLightbox: (event: any, obj: { index: number }) => void
  closeLightbox: () => void
  isViewerOpen: boolean
  currentImage: number
  setCurrentImage: (idx: number) => void
  onEdit: (event: any) => void
  user: User
}

const defaultProps = {
  currentImage: 0,
}

const Gallery: FC<GalleryProps & typeof defaultProps> = ({
  images,
  openLightbox,
  closeLightbox,
  isViewerOpen,
  currentImage,
  setCurrentImage,
  onEdit,
  user,
}) => {
  const [idx, setIdx] = useState<number>(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const imageUrls = images.map((image) => image.url)
  return (
    <div className="max-w-5xl m-auto mt-3">
      {hasRole(user, 'Admin') && (
        <div className="flex flex-row-reverse">
          <Button onClick={onEdit}>Edit</Button>
        </div>
      )}
      {images.map((image, index) => (
        <ImagePresenter
          key={index}
          image={image}
          onClick={(event) => openLightbox(event, { index })}
          onInfoClick={() => {
            setIdx(index)
            onOpen()
          }}
        />
      ))}
      {isViewerOpen && (
        <Lightbox
          imagePadding={0}
          mainSrc={imageUrls[currentImage]}
          nextSrc={imageUrls[(currentImage + 1) % imageUrls.length]}
          prevSrc={
            imageUrls[(currentImage + imageUrls.length - 1) % imageUrls.length]
          }
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() =>
            setCurrentImage(
              (currentImage + imageUrls.length - 1) % imageUrls.length
            )
          }
          onMoveNextRequest={() =>
            setCurrentImage((currentImage + 1) % imageUrls.length)
          }
        />
      )}

      {images && images.length > 0 && (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Info</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Table variant="simple" className="mb-4">
                <Tbody>
                  <Tr>
                    <Td>Name</Td>
                    <Td>{images[idx].name}</Td>
                  </Tr>
                  <Tr>
                    <Td>Width</Td>
                    <Td>{images[idx].size.width} cm</Td>
                  </Tr>
                  <Tr>
                    <Td>Height</Td>
                    <Td>{images[idx].size.height} cm</Td>
                  </Tr>
                  <Tr>
                    <Td>Is for sell</Td>
                    <Td>
                      {images[idx].isForSell ? (
                        <CheckIcon color="green.500" />
                      ) : (
                        <CloseIcon color="red.500" />
                      )}
                    </Td>
                  </Tr>
                  {images[idx].isForSell && (
                    <Tr>
                      <Td>Price</Td>
                      <Td>{images[idx].price} Euro</Td>
                    </Tr>
                  )}
                  {images[idx].description && (
                    <Tr>
                      <Td>Description</Td>
                      <Td>{images[idx].description}</Td>
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

export default Gallery

import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Table,
  Tbody,
  Tr,
  Td,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import useI18n from '../lib/hooks/useI18n'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {
  currentImageSelector,
  galleryActions,
  gallerySelector,
} from '../redux/slices/gallerySlice'
import { cartActions, cartSelector } from '../redux/slices/cartSlice'
import useToasts from '../lib/hooks/useToasts'

const GalleryImageInfo = () => {
  const { t } = useI18n()
  const state = useAppSelector(gallerySelector)
  const dispatch = useAppDispatch()
  const image = currentImageSelector(state).currentImage!

  useToasts(cartSelector)

  return (
    <Modal
      isOpen={state.isInfoModalOpen}
      onClose={() => dispatch(galleryActions.closeInfoModal())}
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
                <Td>{t.imageName}</Td>
                <Td>{image.name}</Td>
              </Tr>
              <Tr>
                <Td>{t.width}</Td>
                <Td>{image.width} cm</Td>
              </Tr>
              <Tr>
                <Td>{t.height}</Td>
                <Td>{image.height} cm</Td>
              </Tr>
              <Tr>
                <Td>{t.isForSell}</Td>
                <Td>
                  {image.isForSell ? (
                    <CheckIcon color="green.500" />
                  ) : (
                    <CloseIcon color="red.500" />
                  )}
                </Td>
              </Tr>
              {image.isForSell && (
                <>
                  <Tr>
                    <Td>{t.price}</Td>
                    <Td>
                      {image.price} {t.euro}
                      <Button
                        mx="2"
                        color="green.500"
                        onClick={() => dispatch(cartActions.addCartItem(image))}
                      >
                        {t.buy}
                      </Button>
                    </Td>
                  </Tr>
                </>
              )}
              {image.description && (
                <Tr>
                  <Td>{t.description}</Td>
                  <Td>{image.description}</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default GalleryImageInfo

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
import React, { Fragment } from 'react'
import FullPageLoader from 'src/components/FullPageLoader'
import useCart from 'src/features/cart/hooks/useCart'
import useI18n from 'src/lib/hooks/useI18n'
import { GalleryImage } from 'src/types/PrismaProxy'

interface Props {
  isInfoModalOpen: boolean
  image: GalleryImage
  onClose: () => void
}

const GalleryImageInfo = ({ isInfoModalOpen, image, onClose }: Props) => {
  const { t } = useI18n()
  const { addToCart, isLoading } = useCart()

  return (
    <Fragment>
      <FullPageLoader isLoading={isLoading} />
      <Modal isOpen={isInfoModalOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple" className="mb-4">
              <Tbody>
                <Tr>
                  <Td>{t.imageName}</Td>
                  <Td>{image?.['name']}</Td>
                </Tr>
                <Tr>
                  <Td>{t.width}</Td>
                  <Td>{image?.['width']} cm</Td>
                </Tr>
                <Tr>
                  <Td>{t.height}</Td>
                  <Td>{image?.['height']} cm</Td>
                </Tr>
                <Tr>
                  <Td>{t.isForSell}</Td>
                  <Td>
                    {image?.['isForSell'] ? (
                      <CheckIcon color="green.500" />
                    ) : (
                      <CloseIcon color="red.500" />
                    )}
                  </Td>
                </Tr>
                {image?.['isForSell'] && (
                  <>
                    <Tr>
                      <Td>{t.price}</Td>
                      <Td>
                        {image?.['price']} {t.euro}
                        <Button
                          mx="2"
                          color="green.500"
                          onClick={() => addToCart({ imageId: image['id'] })}
                        >
                          {t.buy}
                        </Button>
                      </Td>
                    </Tr>
                  </>
                )}
                {image?.['description'] && (
                  <Tr>
                    <Td>{t.description}</Td>
                    <Td>{image['description']}</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}

export default GalleryImageInfo

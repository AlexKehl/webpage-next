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
import { GalleryImageMeta } from '../../common/interface/GalleryImages'
import useCart from '../lib/hooks/useCart'
import useI18n from '../lib/hooks/useI18n'
import usePayments from '../lib/hooks/usePayments'

type Props = {
  isOpen: boolean
  onClose: () => void
} & GalleryImageMeta

const GalleryImageInfo = (props: Props) => {
  const {
    name,
    width,
    height,
    isForSell,
    description,
    price,
    isOpen,
    onClose,
    id,
  } = props
  const { t } = useI18n()
  const { buyImage } = usePayments()
  const { addItem } = useCart()
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table variant="simple" className="mb-4">
            <Tbody>
              <Tr>
                <Td>{t.imageName}</Td>
                <Td>{name}</Td>
              </Tr>
              <Tr>
                <Td>{t.width}</Td>
                <Td>{width} cm</Td>
              </Tr>
              <Tr>
                <Td>{t.height}</Td>
                <Td>{height} cm</Td>
              </Tr>
              <Tr>
                <Td>{t.isForSell}</Td>
                <Td>
                  {isForSell ? (
                    <CheckIcon color="green.500" />
                  ) : (
                    <CloseIcon color="red.500" />
                  )}
                </Td>
              </Tr>
              {isForSell && (
                <>
                  <Tr>
                    <Td>{t.price}</Td>
                    <Td>
                      {price} {t.euro}
                      <Button
                        mx="2"
                        color="green.500"
                        // onClick={() => buyImage({ id, price: price! })}
                        onClick={() => addItem(props)}
                      >
                        {t.buy}
                      </Button>
                    </Td>
                  </Tr>
                </>
              )}
              {description && (
                <Tr>
                  <Td>{t.description}</Td>
                  <Td>{description}</Td>
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

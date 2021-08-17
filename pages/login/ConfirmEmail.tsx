import { CheckIcon } from '@chakra-ui/icons'
import {
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Center,
} from '@chakra-ui/react'
import React from 'react'
import { Texts } from '../../src/constants/Texts'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const Register = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent px="5">
        <ModalHeader>
          <Center w="100%">
            <CheckIcon w={24} h={24} color="green.500" />
          </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="6">
          <Center>
            <Text fontSize="3xl">{Texts.verifyEmail}</Text>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Register

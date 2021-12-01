import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'
import ConfirmEmail from './ConfirmEmailDialog'
import EmailField from './EmailField'
import PasswordField from './PasswordField'
import useRegister from '../lib/hooks/useRegister'
import RepeatPasswordField from './RepeatPasswordField'
import useI18n from '../lib/hooks/useI18n'
import { FormProvider } from 'react-hook-form'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const Register = ({ isOpen, onClose }: Props) => {
  const { t } = useI18n()
  const {
    onSubmit,
    arePasswordsMatching,
    onConfirmEmailClose,
    isConfirmEmailOpen,
    formData,
  } = useRegister({ onClose })

  return (
    <div>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px="5">
          <form onSubmit={onSubmit}>
            <ModalHeader>
              <Center>{t.createAccount}</Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormProvider {...formData}>
                <EmailField my="1" />
                <PasswordField my="1" />
                <RepeatPasswordField
                  my="1"
                  arePasswordsMatching={arePasswordsMatching}
                />
              </FormProvider>
            </ModalBody>

            <ModalFooter>
              <Center w="100%">
                <Button variant="ghost" type="submit">
                  {t.create}
                </Button>
              </Center>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <ConfirmEmail onClose={onConfirmEmailClose} isOpen={isConfirmEmailOpen} />
    </div>
  )
}

export default Register

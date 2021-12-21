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
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import ConfirmEmail from './ConfirmEmailDialog'
import EmailField from './EmailField'
import PasswordField from './PasswordField'
import RepeatPasswordField from './RepeatPasswordField'
import useI18n from '../lib/hooks/useI18n'
import useToasts from '../lib/hooks/useToasts'
import { FormProvider, useForm } from 'react-hook-form'
import { useRegisterMutation } from '../redux/services/serverApi'
import { RegisterDto } from '../../common/interface/Dto'
import { userSelector } from '../redux/slices/userSlice'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const Register = ({ isOpen, onClose }: Props) => {
  const { t } = useI18n()
  const formData = useForm()
  const [registerMutation] = useRegisterMutation()
  useToasts(userSelector)

  const { isOpen: isConfirmEmailOpen, onClose: onConfirmEmailClose } =
    useDisclosure()

  const arePasswordsMatching = (passwordRepeat: string) => {
    return passwordRepeat === formData.getValues()['password']
  }

  const register = (data: RegisterDto) => {
    registerMutation(data)
  }

  return (
    <div>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px="5">
          <form onSubmit={formData.handleSubmit(register)}>
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

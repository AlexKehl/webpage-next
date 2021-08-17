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
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import HttpStatus from '../../common/constants/HttpStatus'
import { RegisterDto } from '../../common/interface/Dto'
import { tryCatch } from '../../common/utils/Functions'
import InputField from '../../src/components/InputField'
import { Texts } from '../../src/constants/Texts'
import { registerRequest } from '../../src/lib/api/Register'
import ConfirmEmail from './ConfirmEmail'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const Register = ({ isOpen, onClose }: Props) => {
  const { register, handleSubmit, formState, getValues } = useForm()
  const {
    isOpen: isConfirmEmailOpen,
    onOpen: onConfirmEmailOpen,
    onClose: onConfirmEmailClose,
  } = useDisclosure()
  const toast = useToast()

  const onSubmit = async (registerDto: RegisterDto) => {
    const [err, res] = await tryCatch(() => registerRequest(registerDto))
    if (err && !axios.isAxiosError(err)) {
      throw err
    }
    if (err && err.response?.status === HttpStatus.CONFLICT) {
      return toast({
        title: 'Error',
        description: Texts.emailAlreadyTaken,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    onClose()
    onConfirmEmailOpen()
  }

  return (
    <div>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px="5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              <Center>{Texts.createAccount}</Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InputField
                id="email"
                my="2"
                error={formState.errors['email']}
                errorText={Texts.emailRuleFail}
                hookFormRegister={register('email', {
                  required: true,
                  pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
                placeholder={Texts.email}
              />
              <InputField
                type="password"
                my="2"
                placeholder={Texts.password}
                error={formState.errors['password']}
                errorText={Texts.passwordRuleFail}
                hookFormRegister={register('password', {
                  required: true,
                  minLength: 8,
                })}
              />
              <InputField
                id="repeatpassword"
                my="2"
                type="password"
                placeholder={Texts.repeatPassword}
                error={formState.errors['repeatpassword']}
                errorText={Texts.passwordsDoNotMatch}
                hookFormRegister={register('repeatpassword', {
                  required: true,
                  minLength: 8,
                  validate: (passwordRepeat: string) => {
                    return passwordRepeat === getValues()['password']
                  },
                })}
              />
            </ModalBody>

            <ModalFooter>
              <Center w="100%">
                <Button variant="ghost" type="submit">
                  {Texts.create}
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

import { useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import HttpStatus from '../../../common/constants/HttpStatus'
import { RegisterDto } from '../../../common/interface/Dto'
import { tryCatch } from '../../../common/utils/Functions'
import { Texts } from '../../constants/Texts'
import { registerRequest } from '../api/Register'

interface Options {
  onClose: () => void
}

const useRegister = ({ onClose }: Options) => {
  const { register, handleSubmit, formState, getValues } = useForm()
  const {
    isOpen: isConfirmEmailOpen,
    onOpen: onConfirmEmailOpen,
    onClose: onConfirmEmailClose,
  } = useDisclosure()
  const toast = useToast()

  const onSubmit = async (registerDto: RegisterDto) => {
    const [err] = await tryCatch(() => registerRequest(registerDto))
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

  const arePasswordsMatching = (passwordRepeat: string) => {
    return passwordRepeat === getValues()['password']
  }

  return {
    onSubmit: handleSubmit(onSubmit),
    formState,
    register,
    arePasswordsMatching,
    onConfirmEmailClose,
    isConfirmEmailOpen,
  }
}

export default useRegister

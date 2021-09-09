import { useDisclosure } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import HttpStatus from '../../../common/constants/HttpStatus'
import { RegisterDto } from '../../../common/interface/Dto'
import { registerRequest } from '../api/Register'
import { handleHttpError } from '../errors/Handlers'
import useI18n from './useI18n'
import useToasts from './useToasts'

interface Options {
  onClose: () => void
}

const useRegister = ({ onClose }: Options) => {
  const { t } = useI18n()

  const { register, handleSubmit, formState, getValues } = useForm()
  const {
    isOpen: isConfirmEmailOpen,
    onOpen: onConfirmEmailOpen,
    onClose: onConfirmEmailClose,
  } = useDisclosure()
  const { showError } = useToasts()

  const onSubmit = async (registerDto: RegisterDto) => {
    try {
      await registerRequest(registerDto)
      onClose()
      onConfirmEmailOpen()
    } catch (error) {
      handleHttpError({
        error,
        default: () => showError({ text: t.unexpectedError }),
        [HttpStatus.CONFLICT]: () => showError({ text: t.emailAlreadyTaken }),
      })
    }
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

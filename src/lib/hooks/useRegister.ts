import { useDisclosure } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import HttpStatus from '../../../common/constants/HttpStatus'
import { RegisterDto } from '../../../common/interface/Dto'
import { Texts } from '../../constants/Texts'
import { registerRequest } from '../api/Register'
import { handleHttpError } from '../errors/Handlers'
import useToasts from './useToasts'

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
  const { showError } = useToasts()

  const onSubmit = async (registerDto: RegisterDto) => {
    try {
      await registerRequest(registerDto)
      onClose()
      onConfirmEmailOpen()
    } catch (error) {
      handleHttpError({
        error,
        default: () => showError({ text: Texts.unexpectedError }),
        [HttpStatus.CONFLICT]: () =>
          showError({ text: Texts.emailAlreadyTaken }),
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

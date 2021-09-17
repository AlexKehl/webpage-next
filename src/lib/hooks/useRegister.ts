import { useDisclosure } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Endpoints } from '../../../common/constants/Endpoints'
import HttpStatus from '../../../common/constants/HttpStatus'
import { RegisterDto } from '../../../common/interface/Dto'
import { API } from '../../constants/EnvProxy'
import useApi from './useApi'
import useI18n from './useI18n'
import useToasts from './useToasts'

interface Options {
  onClose: () => void
}

const useRegister = ({ onClose }: Options) => {
  const { t } = useI18n()

  const { postWithErrHandle } = useApi()
  const { register, handleSubmit, formState, getValues } = useForm()
  const {
    isOpen: isConfirmEmailOpen,
    onOpen: onConfirmEmailOpen,
    onClose: onConfirmEmailClose,
  } = useDisclosure()
  const { showError } = useToasts()

  const onSubmit = async (registerDto: RegisterDto) => {
    return postWithErrHandle({
      params: {
        url: `${API}${Endpoints.register}`,
        data: registerDto,
        credentials: 'include',
      },
      onSuccess: () => {
        onClose()
        onConfirmEmailOpen()
      },
      [HttpStatus.CONFLICT]: () => showError({ text: t.emailAlreadyTaken }),
      default: () => showError({ text: t.unexpectedError }),
    })
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

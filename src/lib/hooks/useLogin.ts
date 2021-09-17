import { useDisclosure } from '@chakra-ui/react'
import router from 'next/router'
import { useForm } from 'react-hook-form'
import { Endpoints } from '../../../common/constants/Endpoints'
import HttpStatus from '../../../common/constants/HttpStatus'
import { LoginResponse } from '../../../common/interface/ConsumerResponses'
import { LoginDto } from '../../../common/interface/Dto'
import { API } from '../../constants/EnvProxy'
import useApi from './useApi'
import useI18n from './useI18n'
import useToasts from './useToasts'
import useUser from './useUser'

const useLogin = () => {
  const { t } = useI18n()
  const { register, handleSubmit, formState } = useForm()
  const { showError, showSuccess } = useToasts()
  const { setUser, deleteUser, user } = useUser()
  const { postWithErrHandle } = useApi()

  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure()

  const performLogin = async (loginDto: LoginDto) => {
    return postWithErrHandle<LoginResponse>({
      params: {
        url: `${API}${Endpoints.login}`,
        data: loginDto,
        credentials: 'include',
      },
      onSuccess: (res) => {
        showSuccess({ text: t.successFullLogin })
        setUser(res.user)
        router.push('/')
      },
      [HttpStatus.UNAUTHORIZED]: () => showError({ text: t.wrongCredentials }),
      [HttpStatus.NOT_FOUND]: () => showError({ text: t.userNotRegistered }),
      default: () => showError({ text: t.unexpectedError }),
    })
  }

  const performLogout = async () => {
    return postWithErrHandle<LoginResponse>({
      params: {
        url: `${API}${Endpoints.logout}`,
        data: { email: user?.email },
        credentials: 'include',
      },
      onSuccess: () => {
        deleteUser()
        showSuccess({ text: t.successFullLogout })
        router.push('/login')
      },
      default: () => showError({ text: t.unexpectedError }),
    })
  }

  return {
    performLogin: handleSubmit(performLogin),
    performLogout,
    formState,
    register,
    onRegisterOpen,
    onRegisterClose,
    isRegisterOpen,
  }
}

export default useLogin

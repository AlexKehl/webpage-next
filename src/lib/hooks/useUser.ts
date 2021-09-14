import { useRouter } from 'next/router'
import { LoginDto } from '../../../common/interface/Dto'
import {
  LoginResponse,
  User,
} from '../../../common/interface/ConsumerResponses'
import useToasts from './useToasts'
import HttpStatus from '../../../common/constants/HttpStatus'
import useI18n from './useI18n'
import { postJSON, withErrHandle } from '../api/Utils'
import { Endpoints } from '../../../common/constants/Endpoints'
import { API } from '../../constants/EnvProxy'
import { getItem, setItem } from '../utils/LocalStorage'
import { useState } from 'react'

const useUser = () => {
  const { t } = useI18n()
  const router = useRouter()
  const { showError, showSuccess } = useToasts()
  const [user, setUser] = useState<User | undefined>(getItem('user'))

  const getUser = () => {
    return user
  }

  const isLoggedIn = Boolean(getUser())

  const performLogin = async (loginDto: LoginDto) => {
    return withErrHandle<LoginResponse>({
      fn: () => postJSON({ url: `${API}${Endpoints.login}`, data: loginDto }),
      onSuccess: (res) => {
        showSuccess({ text: t.successFullLogin })
        setItem('user', res.user)
        setUser(res.user)
        router.push('/')
      },
      [HttpStatus.UNAUTHORIZED]: () => showError({ text: t.wrongCredentials }),
      [HttpStatus.NOT_FOUND]: () => showError({ text: t.userNotRegistered }),
      default: () => showError({ text: t.unexpectedError }),
    })
  }

  const performLogout = async () => {
    setItem('user', undefined)
    setUser(undefined)

    showSuccess({ text: t.successFullLogout })
    router.push('/login')
  }

  return {
    isLoggedIn,
    performLogin,
    performLogout,
    getUser,
  }
}

export default useUser

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { login, logout } from '../api/Auth'
import { LoginDto } from '../../../common/interface/Dto'
import { User } from '../../../common/interface/ConsumerResponses'
import { decode } from 'jsonwebtoken'
import useToasts from './useToasts'
import HttpStatus from '../../../common/constants/HttpStatus'
import { handleHttpError } from '../errors/Handlers'
import useI18n from './useI18n'

const useUser = () => {
  const { t } = useI18n()
  const [cookies, , removeCookie] = useCookies(['accessToken'])
  const router = useRouter()
  const { showError, showSuccess } = useToasts()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(Boolean(cookies['accessToken']))
  }, [cookies])

  const getUser = (): User => {
    const accessToken = cookies['accessToken']
    const { email, roles } = decode(accessToken, { json: true }) || {}
    return { email, roles }
  }

  const performLogin = async (credentials: LoginDto) => {
    try {
      await login(credentials)
      showSuccess({ text: t.successFullLogin })
      router.push('/')
    } catch (error) {
      handleHttpError({
        error,
        [HttpStatus.UNAUTHORIZED]: () =>
          showError({ text: t.wrongCredentials }),
        default: () => showError({ text: t.unexpectedError }),
      })
    }
  }

  const performLogout = async () => {
    removeCookie('accessToken', { path: '/' })
    await logout(getUser().email)

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

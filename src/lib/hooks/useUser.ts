import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { login, logout } from '../api/Auth'
import { LoginDto } from '../../../common/interface/Dto'
import { User } from '../../../common/interface/ConsumerResponses'
import { decode } from 'jsonwebtoken'
import { Texts } from '../../constants/Texts'
import useToasts from './useToasts'

const useUser = () => {
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
      showSuccess({ text: Texts.successFullLogin })
      router.push('/')
    } catch (e) {
      console.log(e.message)
      showError({ text: Texts.wrongCredentials })
    }
  }

  const performLogout = async () => {
    removeCookie('accessToken', { path: '/' })
    await logout(getUser().email)

    showSuccess({ text: Texts.successFullLogout })
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

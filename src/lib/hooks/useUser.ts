import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { getObj, setObj } from '../../utils/LocalStorage'
import { login, logout } from '../api/Auth'
import { LoginDto } from '../../../../common/interface/Dto'
import { User } from '../../../../common/interface/ConsumerResponses'

const useUser = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken'])
  const router = useRouter()
  const [hasFalseCredentials, setHasFalseCredentials] = useState(false)

  const setUser = (user: User | {}) => setObj('user', user)
  const getUser = (): User => getObj<User>('user')

  const isLoggedIn = Boolean(cookies.accessToken)

  const performLogin = async (credentials: LoginDto) => {
    try {
      const { user } = await login(credentials)
      setUser(user)
      router.push('/')
    } catch (error) {
      setHasFalseCredentials(true)
    }
  }

  const performLogout = async () => {
    removeCookie('accessToken', { path: '/' })
    setUser({})
    await logout(getUser().email)
    router.push('/login')
  }

  return {
    isLoggedIn,
    performLogin,
    performLogout,
    hasFalseCredentials,
    getUser,
  }
}

export default useUser

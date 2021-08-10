import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { login, logout } from '../api/Auth'
import { LoginDto } from '../../../common/interface/Dto'
import { User } from '../../../common/interface/ConsumerResponses'
import { decode } from 'jsonwebtoken'

const useUser = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken'])
  const router = useRouter()
  const [hasFalseCredentials, setHasFalseCredentials] = useState(false)

  const getUser = (): User => {
    const accessToken = cookies['accessToken']
    const { email, roles } = decode(accessToken, { json: true }) || {}
    return { email, roles }
  }

  const isLoggedIn = Boolean(cookies['accessToken'])

  const performLogin = async (credentials: LoginDto) => {
    try {
      await login(credentials)
      router.push('/')
    } catch (error) {
      setHasFalseCredentials(true)
    }
  }

  const performLogout = async () => {
    removeCookie('accessToken', { path: '/' })
    await logout(getUser()?.email)
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

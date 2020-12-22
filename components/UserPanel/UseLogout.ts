import { useCookies } from 'react-cookie'
import { useRouter as useRouterDI } from 'next/router'

const useLogout = (useRouter = useRouterDI) => {
  const [, , removeCookie] = useCookies(['cookie-name'])
  const router = useRouter()

  const removeAuthCookies = () => {
    removeCookie('refreshToken')
    removeCookie('accessToken')
  }

  const performLogout = () => {
    removeAuthCookies()
    router.push('/login')
  }

  return {
    removeAuthCookies,
    performLogout,
  }
}

export default useLogout

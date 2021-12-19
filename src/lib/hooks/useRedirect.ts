import router from 'next/router'
import { useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { store } from '../../redux/store'
import { WithRedirect } from '../../redux/utils'

const useRedirect = <
  U extends WithRedirect,
  T extends (arg: ReturnType<typeof store['getState']>) => U
>(
  selector: T
) => {
  const { redirectUrl } = useAppSelector(selector)

  useEffect(() => {
    if (redirectUrl) {
      router.push(redirectUrl)
    }
  }, [redirectUrl])
}

export default useRedirect

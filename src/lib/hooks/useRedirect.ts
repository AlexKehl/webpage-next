import { useUpdateEffect } from '@chakra-ui/react'
import router from 'next/router'
import { useAppSelector } from '../../redux/hooks'

const useRedirect = () => {
  const store = useAppSelector((store) => store)
  const slicesWithRedirect = Object.values(store).filter(
    (store) => (store as any).hasRedirect
  )

  slicesWithRedirect.forEach(({ redirectUrl }: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useUpdateEffect(() => {
      if (redirectUrl) {
        router.push(redirectUrl)
      }
    }, [redirectUrl])
  })
}

export default useRedirect

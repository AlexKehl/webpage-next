import { useUpdateEffect } from '@chakra-ui/react'
import router from 'next/router'
import { useAppSelector } from 'src/redux/hooks'

const useRedirect = () => {
  const store = useAppSelector((store) => store)
  const slicesWithRedirect = Object.values(store).filter(
    (store) => (store as any).hasRedirect
  )

  slicesWithRedirect.forEach(({ redirect }: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useUpdateEffect(() => {
      if (redirect?.url) {
        router.push(redirect.url)
      }
    }, [redirect])
  })
}

export default useRedirect

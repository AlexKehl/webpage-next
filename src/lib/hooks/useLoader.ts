import { useUpdateEffect } from '@chakra-ui/react'
import { useAppSelector } from '../../redux/hooks'
import { useLoaderContext } from '../contexts/FullPageLoaderContext'

const useLoader = () => {
  const store = useAppSelector((store) => store)
  const slicesWithLoader = Object.values(store).filter(
    (store) => (store as any).hasLoader
  )
  const { setIsLoading } = useLoaderContext()

  slicesWithLoader.forEach(({ isLoading }: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useUpdateEffect(() => {
      setIsLoading(isLoading)
    }, [isLoading])
  })
}

export default useLoader

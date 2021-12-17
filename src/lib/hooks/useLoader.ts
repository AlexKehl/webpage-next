import { useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { store } from '../../redux/store'
import { WithLoader } from '../../redux/utils'
import { useLoaderContext } from '../contexts/FullPageLoaderContext'

const useLoader = <
  U extends WithLoader,
  T extends (arg: ReturnType<typeof store['getState']>) => U
>(
  selector: T
) => {
  const { setIsLoading } = useLoaderContext()
  const { isLoading } = useAppSelector(selector)

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading])
}

export default useLoader

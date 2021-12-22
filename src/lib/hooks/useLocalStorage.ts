import { useUpdateEffect } from '@chakra-ui/react'
import { useAppSelector } from '../../redux/hooks'
import { setItem } from '../utils/LocalStorage'

const useLocalStorage = () => {
  const store = useAppSelector((store) => store)
  const slicesWithLocalStorage = Object.values(store).filter(
    (store) => (store as any).hasLocalStorage
  )

  slicesWithLocalStorage.forEach(({ localStorage }: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useUpdateEffect(() => {
      setItem(localStorage.key, localStorage.value)
    }, [localStorage])
  })
}

export default useLocalStorage

import { useUpdateEffect } from '@chakra-ui/react'
import { useAppSelector } from '../../redux/hooks'
import { store } from '../../redux/store'
import { LocalStorageData, setItem } from '../utils/LocalStorage'

const useLocalStorage = <
  T extends (arg: ReturnType<typeof store['getState']>) => any,
  S extends keyof LocalStorageData
>(
  selector: T,
  watchProp: S
) => {
  const localStorageItem = useAppSelector(selector)

  useUpdateEffect(() => {
    if (localStorageItem) {
      setItem(watchProp, localStorageItem[watchProp])
    }
  }, [localStorageItem])
}

export default useLocalStorage

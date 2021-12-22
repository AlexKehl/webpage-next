import { useToast, useUpdateEffect } from '@chakra-ui/react'
import { useAppSelector } from '../../redux/hooks'
import { capitalize } from '../../utils/Functions'
import useI18n from './useI18n'

const useToasts = () => {
  const { t } = useI18n()
  const chakraToast = useToast()
  const store = useAppSelector((store) => store)
  const slicesWithToasts = Object.values(store).filter(
    (store) => (store as any).hasToasts
  )

  slicesWithToasts.forEach(({ toast }: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useUpdateEffect(() => {
      if (toast) {
        chakraToast({
          title: capitalize(toast.type),
          //@ts-ignore
          description: t[toast.text],
          status: toast.type,
          duration: 6000,
          isClosable: true,
        })
      }
    }, [toast])
  })
}

export default useToasts

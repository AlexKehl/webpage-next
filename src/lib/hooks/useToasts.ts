import { useToast, useUpdateEffect } from '@chakra-ui/react'
import { useAppSelector } from '../../redux/hooks'
import { store } from '../../redux/store'
import { WithToast } from '../../redux/utils'
import { capitalize } from '../../utils/Functions'
import useI18n from './useI18n'

const useToasts = <
  U extends WithToast,
  T extends (arg: ReturnType<typeof store['getState']>) => U
>(
  selector: T
) => {
  const { t } = useI18n()
  const chakraToast = useToast()

  const { toast } = useAppSelector(selector)

  useUpdateEffect(() => {
    if (toast) {
      chakraToast({
        title: capitalize(toast.type),
        description: t[toast.text],
        status: toast.type,
        duration: 6000,
        isClosable: true,
      })
    }
  }, [toast])
}

export default useToasts

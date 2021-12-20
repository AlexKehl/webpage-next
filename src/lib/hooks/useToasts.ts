import { useToast, useUpdateEffect } from '@chakra-ui/react'
import { useAppSelector } from '../../redux/hooks'
import { store } from '../../redux/store'
import { WithToast } from '../../redux/utils'
import useI18n from './useI18n'

interface ToastOptionsOld {
  text: string
  title?: string
  duration?: number
  isClosable?: boolean
}

const useToasts = <
  U extends WithToast,
  T extends (arg: ReturnType<typeof store['getState']>) => U
>(
  selector: T
) => {
  const { t } = useI18n()
  const chakraToast = useToast()

  if (!selector) {
    const showSuccess = ({
      text,
      title = t.success,
      isClosable = true,
      duration = defaultDuration,
    }: ToastOptionsOld) => {
      chakraToast({
        title: title,
        description: text,
        status: 'success',
        duration: duration,
        isClosable: isClosable,
      })
    }

    const showError = ({
      text,
      title = t.error,
      isClosable = true,
      duration = defaultDuration,
    }: ToastOptionsOld) => {
      chakraToast({
        title: title,
        description: text,
        status: 'error',
        duration: duration,
        isClosable: isClosable,
      })
    }

    return {
      showSuccess,
      showError,
    }
  }
  const { toast } = useAppSelector(selector)

  useUpdateEffect(() => {
    if (toast) {
      chakraToast({
        title: toast.type,
        description: t[toast.text],
        status: toast.type,
        duration: 6000,
        isClosable: true,
      })
    }
  }, [toast])

  const defaultDuration = 9000

  const showSuccess = ({
    text,
    title = t.success,
    isClosable = true,
    duration = defaultDuration,
  }: ToastOptionsOld) => {
    chakraToast({
      title: title,
      description: text,
      status: 'success',
      duration: duration,
      isClosable: isClosable,
    })
  }

  const showError = ({
    text,
    title = t.error,
    isClosable = true,
    duration = defaultDuration,
  }: ToastOptionsOld) => {
    chakraToast({
      title: title,
      description: text,
      status: 'error',
      duration: duration,
      isClosable: isClosable,
    })
  }

  return {
    showSuccess,
    showError,
  }
}

export default useToasts

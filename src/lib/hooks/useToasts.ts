import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
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
  console.log(selector)
  const { t } = useI18n()
  const chakraToast = useToast()
  const { toast } = useAppSelector(selector)

  useEffect(() => {
    if (toast) {
      chakraToast({
        title: t.error,
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

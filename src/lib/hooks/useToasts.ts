import { useToast } from '@chakra-ui/react'
import useI18n from './useI18n'

interface ToastOptions {
  text: string
  title?: string
  duration?: number
  isClosable?: boolean
}

const useToasts = () => {
  const { t } = useI18n()
  const toast = useToast()
  const defaultDuration = 9000

  const showSuccess = ({
    text,
    title = t.success,
    isClosable = true,
    duration = defaultDuration,
  }: ToastOptions) => {
    toast({
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
  }: ToastOptions) => {
    toast({
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

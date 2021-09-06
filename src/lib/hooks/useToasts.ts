import { useToast } from '@chakra-ui/react'
import { Texts } from '../../constants/Texts'

interface ToastOptions {
  text: string
  title?: string
  duration?: number
  isClosable?: boolean
}

const useToasts = () => {
  const toast = useToast()
  const defaultDuration = 9000

  const showSuccess = ({
    text,
    title = Texts.success,
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
    title = Texts.error,
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

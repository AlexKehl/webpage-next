import { useToast } from '@chakra-ui/react'
import useI18n from './useI18n'

const useToasts = () => {
  const toast = useToast()
  const { t } = useI18n()

  const showSuccessToast = () => {
    return toast({
      title: t.success,
      description: t.successfullySubmitted,
      status: 'success',
      duration: 6000,
      isClosable: true,
    })
  }

  const showErrorToast = () => {
    return toast({
      title: t.error,
      description: t.unexpectedError,
      status: 'error',
      duration: 6000,
      isClosable: true,
    })
  }

  return {
    showSuccessToast,
    showErrorToast,
  }
}

export default useToasts

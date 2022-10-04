import { useToast } from '@chakra-ui/react'

const useToasts = () => {
  const toast = useToast()

  const showSuccessToast = (text: string) => {
    return toast({
      description: text,
      status: 'success',
      duration: 6000,
      isClosable: true,
    })
  }

  const showErrorToast = (text: string) => {
    return toast({
      description: text,
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

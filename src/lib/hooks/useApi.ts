import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import HttpStatus from '../../utils/HttpStatus'

const useApi = () => {
  const toast = useToast()
  const validatedRequest = async <T>(
    requestFn: () => Promise<T>
  ): Promise<T> => {
    try {
      const res = await requestFn()
      toast({
        title: 'Success',
        description: 'Successfully submited your data',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      return res
    } catch (e) {
      if (!axios.isAxiosError(e)) {
        toast({
          title: 'Error',
          description: 'Server error happened. Please try again later',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      if (e.response.status === HttpStatus.BAD_REQUEST) {
        toast({
          title: 'Invalid data',
          description: 'Verify submitted data',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    }
  }

  return {
    validatedRequest,
  }
}

export default useApi

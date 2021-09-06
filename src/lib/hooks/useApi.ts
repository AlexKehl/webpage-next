import HttpStatus from '../../../common/constants/HttpStatus'
import { handleHttpError } from '../errors/Handlers'
import useToasts from './useToasts'

const useApi = () => {
  const { showError, showSuccess } = useToasts()
  const validatedRequest = async <T>(
    requestFn: () => Promise<T>
  ): Promise<T | undefined> => {
    try {
      const res = await requestFn()
      showSuccess({ text: 'Successfully submited your data' })
      return res
    } catch (error: any) {
      handleHttpError({
        error,
        default: () =>
          showError({ text: 'Server error happened. Please try again later' }),
        [HttpStatus.BAD_REQUEST]: () =>
          showError({ text: 'Verify submitted data' }),
      })
    }
  }

  return {
    validatedRequest,
  }
}

export default useApi

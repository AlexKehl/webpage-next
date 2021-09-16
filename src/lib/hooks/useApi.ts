import axios from 'axios'
import HttpStatus from '../../../common/constants/HttpStatus'
import useI18n from './useI18n'
import useToasts from './useToasts'

const useApi = () => {
  const { showError, showSuccess } = useToasts()
  const { t } = useI18n()
  const validatedRequest = async <T>(
    requestFn: () => Promise<T>
  ): Promise<T | undefined> => {
    try {
      const res = await requestFn()

      showSuccess({ text: t.successfullySubmitted })
      return res
    } catch (e: any) {
      if (!axios.isAxiosError(e)) {
        showError({ text: t.serverError })
        return
      }
      if (e.response?.status === HttpStatus.BAD_REQUEST) {
        showError({ text: t.verifyData })
        return
      }

      showError({ text: t.serverError })
    }
  }

  return {
    validatedRequest,
  }
}

export default useApi

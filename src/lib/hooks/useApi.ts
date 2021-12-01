import axios from 'axios'
import HttpStatus from '../../../common/constants/HttpStatus'
import { AsyncReturnType, ValueOf } from '../../../common/types'
import { useLoaderContext } from '../contexts/FullPageLoaderContext'
import FetchError from '../errors/exceptions/FetchError'
import useI18n from './useI18n'
import useToasts from './useToasts'

const useApi = () => {
  const { showError, showSuccess } = useToasts()
  const { setIsLoading } = useLoaderContext()
  const { t } = useI18n()

  const fetchWithProgress =
    <T extends (...args: any[]) => any>(fn: T) =>
    async (...args: Parameters<T>): Promise<AsyncReturnType<T>> => {
      try {
        setIsLoading(true)
        const res = await fn(...args)
        setIsLoading(false)
        return res
      } catch (e) {
        setIsLoading(false)
        throw e
      }
    }

  const validatedRequest = async <T>(
    requestFn: () => Promise<T>
  ): Promise<T | undefined> => {
    try {
      const res = await fetchWithProgress(requestFn)()

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

  const fetchWithErrHandle = async <T>({
    fn,
    onSuccess,
    ...handlers
  }: {
    fn: () => Promise<T>
    onSuccess: (res: T) => any
    default: (...args: any[]) => void
  } & Partial<Record<ValueOf<typeof HttpStatus>, () => void>>) => {
    try {
      const res = (await fetchWithProgress(fn)()) as T
      return onSuccess(res)
    } catch (e: any) {
      if (!(e instanceof FetchError)) {
        return handlers.default(e)
      }
      if (handlers[e.status]) {
        return handlers[e.status]!()
      }
      return handlers.default(e)
    }
  }

  return {
    validatedRequest,
    fetchWithErrHandle,
    fetchWithProgress,
  }
}

export default useApi

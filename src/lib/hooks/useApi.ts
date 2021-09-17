import axios from 'axios'
import HttpStatus from '../../../common/constants/HttpStatus'
import { ValueOf } from '../../../common/types'
import { PostParams } from '../../types'
import { postJSON } from '../api/Utils'
import { useLoaderContext } from '../contexts/FullPageLoaderContext'
import FetchError from '../errors/exceptions/FetchError'
import useI18n from './useI18n'
import useToasts from './useToasts'

const useApi = () => {
  const { showError, showSuccess } = useToasts()
  const { setIsLoading } = useLoaderContext()
  const { t } = useI18n()
  const validatedRequest = async <T>(
    requestFn: () => Promise<T>
  ): Promise<T | undefined> => {
    try {
      setIsLoading(true)
      const res = await requestFn()

      setIsLoading(false)
      showSuccess({ text: t.successfullySubmitted })
      return res
    } catch (e: any) {
      setIsLoading(false)
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

  const postWithErrHandle = async <T>({
    params,
    onSuccess,
    ...handlers
  }: {
    params: PostParams
    onSuccess: (res: T) => any
    default: () => void
  } & Partial<Record<ValueOf<typeof HttpStatus>, () => void>>) => {
    try {
      setIsLoading(true)
      const res = await postJSON<T>(params)
      setIsLoading(false)
      return onSuccess(res)
    } catch (e: any) {
      setIsLoading(false)
      if (!(e instanceof FetchError)) {
        return handlers.default()
      }
      if (handlers[e.status]) {
        return handlers[e.status]!()
      }
      return handlers.default()
    }
  }

  const fetchWithProgress = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      setIsLoading(true)
      const res = await fn()
      setIsLoading(false)
      return res
    } catch (e) {
      setIsLoading(false)
      throw e
    }
  }

  return {
    validatedRequest,
    postWithErrHandle,
    fetchWithProgress,
  }
}

export default useApi

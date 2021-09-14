import HttpStatus from '../../../common/constants/HttpStatus'
import { ValueOf } from '../../../common/types'

export const handleErrors = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response
}

export const getData = (response: Response) => response.json()

interface PostJSONOpts extends RequestInit {
  url: string
  data?: Record<string, any>
}

export const postJSON = ({ url, method, data, ...rest }: PostJSONOpts) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    ...rest,
  })
}

type WithErrHandleOptions<T> = Partial<
  Record<ValueOf<typeof HttpStatus>, () => void>
> & {
  fn: () => Promise<Response>
  onSuccess: (res: T) => any
  default: () => void
}

export const withErrHandle = async <T = any>({
  fn,
  onSuccess,
  ...handlers
}: WithErrHandleOptions<T>) => {
  try {
    const res = await fn()
    console.log(res)
    if (res.ok) {
      const data = await res.json()
      return onSuccess(data)
    }
    const status = res.status as ValueOf<typeof HttpStatus>
    if (handlers[status]) {
      return handlers[status]!()
    }
    return handlers.default()
  } catch (e: any) {
    console.log(e.message)
    return handlers.default()
  }
}

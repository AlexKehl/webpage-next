import HttpStatus from '../../../common/constants/HttpStatus'
import { ValueOf } from '../../../common/types'
import { PostParams } from '../../types'
import FetchError from '../errors/exceptions/FetchError'
// @ts-ignore
import fetch from 'node-fetch'

export const handleErrors = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response
}

export const getData = (response: Response) => response.json()

export async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request)
  const body = await response.json()
  return body
}

export const apiGet = async <T>({
  url,
  params,
  credentials,
}: {
  url: string
  params?: Record<string, string>
  credentials?: RequestCredentials
}): Promise<T> => {
  const stringParams = new URLSearchParams(params).toString()
  const response = await fetch(`${url}?${stringParams}`, {
    method: 'GET',
    credentials,
  })
  const body = await response.json()
  return body
}

export const postJSON = async <T>({
  url,
  method,
  data,
  ...rest
}: PostParams): Promise<T> => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    ...rest,
  })
  if (res.status >= 400) {
    throw new FetchError({
      status: res.status as ValueOf<typeof HttpStatus>,
      statusText: res.statusText,
    })
  }

  const body = await res.json()
  return body
}

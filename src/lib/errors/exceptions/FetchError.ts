import HttpStatus from 'common/constants/HttpStatus'
import { ValueOf } from 'common/types'

interface ConstructorOpts {
  status: ValueOf<typeof HttpStatus>
  statusText: string
  message?: string
}

export default class FetchError extends Error {
  readonly status: ValueOf<typeof HttpStatus>
  readonly statusText: string

  constructor({ status, statusText, message }: ConstructorOpts) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.status = status
    this.statusText = statusText
  }

  isFetchError() {
    return true
  }
}

import axios from 'axios'
import HttpStatus from '../../../common/constants/HttpStatus'
import { ValueOf } from '../../../common/types'

type Opts = Partial<Record<ValueOf<typeof HttpStatus>, () => void>> & {
  default: () => void
  error: any
}

export const handleHttpError = ({ error, ...handlers }: Opts) => {
  if (!axios.isAxiosError(error)) {
    return handlers.default()
  }
  const status = error.response?.status as ValueOf<typeof HttpStatus>
  if (handlers[status]) {
    return handlers[status]!()
  }
  return handlers.default()
}

import axios, { AxiosRequestConfig } from 'axios'
import { tryCatch } from '../../../common/utils/Functions'
import HttpStatus from '../../../common/constants/HttpStatus'
import { Endpoints } from '../../../common/constants/Endpoints'
import UnauthorizedException from '../errors/exceptions/UnauthorizedException'
import { API } from '../../constants/EnvProxy'

axios.defaults.withCredentials = true

const refreshToken = async () => {
  await axios({
    url: `${API}${Endpoints.refreshAccessToken}`,
    method: 'post',
  })
}

const attemptProtectedRequest = async (options: AxiosRequestConfig) => {
  const augmentedOptions = { ...options }
  const [attemtErr, res] = await tryCatch(() => axios(augmentedOptions))
  if (!attemtErr) {
    return res
  }
  if (!axios.isAxiosError(attemtErr)) {
    throw attemtErr
  }
  if (attemtErr?.response?.status !== HttpStatus.UNAUTHORIZED) {
    throw attemtErr
  }
  const [refreshErr] = await tryCatch(refreshToken)
  if (refreshErr) {
    throw new UnauthorizedException()
  }
  const [finalErr, finalRes] = await tryCatch(() => axios(augmentedOptions))
  if (!finalErr) {
    return finalRes
  }
  throw finalErr
}

export { attemptProtectedRequest }

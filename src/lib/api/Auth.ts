import axios, { AxiosRequestConfig } from 'axios'
import { LoginResponse } from '../../../common/interface/ConsumerResponses'
import { LoginDto } from '../../../common/interface/Dto'
import { tryCatch } from '../../../common/utils/Functions'
import HttpStatus from '../../../common/constants/HttpStatus'
import { Endpoints } from '../../../common/constants/Endpoints'
import UnauthorizedException from '../errors/exceptions/UnauthorizedException'
import { API } from '../../constants/EnvProxy'

axios.defaults.withCredentials = true

const login = async (loginDto: LoginDto): Promise<LoginResponse> => {
  const res = await fetch(`${API}${Endpoints.login}`, {
    method: 'POST',
    body: JSON.stringify(loginDto),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
  return res.json()
}

const logout = async (email?: string) => {
  if (!email) {
    return
  }
  await axios.post(`${API}${Endpoints.logout}`, { email })
}

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

export { login, logout, attemptProtectedRequest }

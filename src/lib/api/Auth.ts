import axios, { AxiosRequestConfig } from 'axios'
import { LoginResponse } from '../../../common/interface/ConsumerResponses'
import { LoginDto } from '../../../common/interface/Dto'
import { tryCatch } from '../../../common/utils/Functions'
import { API } from '../../../config'
import UnauthorizedException from '../../exceptions/UnauthorizedException'
import HttpStatus from '../../utils/HttpStatus'

const login = async (loginDto: LoginDto): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>(`${API}/login`, loginDto, {
    withCredentials: true,
  })
  return data
}

const logout = async (email?: string) => {
  if (!email) {
    return
  }
  await axios.post(`${API}/logout`, { email }, { withCredentials: true })
}

const refreshToken = async () => {
  await axios({
    url: `${API}/refreshToken`,
    method: 'post',
    withCredentials: true,
  })
}

const attemptProtectedRequest = async (options: AxiosRequestConfig) => {
  const augmentedOptions = { ...options, withCredentials: true }
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

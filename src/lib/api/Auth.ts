import axios from 'axios'
import { API } from '../../../config'
import { Credentials, User } from '../../types'
import { LoginResponseData } from '../../types/ApiResponses'

const login = async (credentials: Credentials): Promise<User> => {
  const { data } = await axios.post<LoginResponseData>(
    `${API}/login`,
    credentials,
    { withCredentials: true }
  )
  return data.user
}

const logout = async (email: string) => {
  await axios.post(`${API}/logout`, { email }, { withCredentials: true })
}

export { login, logout }

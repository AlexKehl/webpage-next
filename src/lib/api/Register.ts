import axios from 'axios'
import { Endpoints } from '../../../common/constants/Endpoints'
import { ConfirmEmailDto, RegisterDto } from '../../../common/interface/Dto'
import { API } from '../../../config'

const registerRequest = async (registerDto: RegisterDto): Promise<any> => {
  const { data } = await axios.post<any>(
    `${API}${Endpoints.register}`,
    registerDto,
    {
      withCredentials: true,
    }
  )
  return data
}

const confirmEmailTokenRequest = async (dto: ConfirmEmailDto) => {
  const { data } = await axios.post(`${API}${Endpoints.emailConfirm}`, dto)
  return data
}

export { registerRequest, confirmEmailTokenRequest }

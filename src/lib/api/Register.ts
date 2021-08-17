import axios from 'axios'
import { Endpoints } from '../../../common/constants/Endpoints'
import { RegisterDto } from '../../../common/interface/Dto'
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

export { registerRequest }

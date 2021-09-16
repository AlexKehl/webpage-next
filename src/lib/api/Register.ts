import axios from 'axios'
import { Endpoints } from '../../../common/constants/Endpoints'
import { ConfirmEmailDto } from '../../../common/interface/Dto'
import { API } from '../../constants/EnvProxy'

const confirmEmailTokenRequest = async (dto: ConfirmEmailDto) => {
  const { data } = await axios.post(`${API}${Endpoints.emailConfirm}`, dto)
  return data
}

export { confirmEmailTokenRequest }

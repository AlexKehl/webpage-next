import { Endpoints } from '../../../common/constants/Endpoints'
import { User } from '../../../common/interface/ConsumerResponses'
import {
  AddressInformationDto,
  ContactInformationDto,
} from '../../../common/interface/Dto'
import { API } from '../../constants/EnvProxy'
import { apiGet, postJSON } from './Utils'

export const fetchUserInfo = (email: string) => {
  return apiGet<User>({
    url: `${API}${Endpoints.user}`,
    params: { email },
    credentials: 'include',
  })
}

export const updateContactInformation = (data: ContactInformationDto) => {
  return postJSON({
    url: `${API}${Endpoints.contactInformation}`,
    data,
    credentials: 'include',
  })
}

export const updateAddressInformation = (data: AddressInformationDto) => {
  return postJSON({
    url: `${API}${Endpoints.addressInformation}`,
    data,
    credentials: 'include',
  })
}

export const fetchContactInformation = (email: string) =>
  fetchUserInfo(email).then(({ email, contact }) => ({ ...contact, email }))

export const fetchAddressInformation = (email: string) =>
  fetchUserInfo(email).then(({ email, address }) => ({ ...address, email }))

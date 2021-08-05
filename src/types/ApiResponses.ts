import { Role } from '.'
import { ImageSize } from './Dto'
import { TranslatedText } from './Texts'

export interface BaseData {
  success: boolean
}

export interface ImageForConsumer {
  name: string
  url: string
  category: string
  id: string
  description?: TranslatedText
  isForSell: boolean
  price?: number
  size: ImageSize
}

export interface GalleryCategoryResponse {
  success: boolean
  images: ImageForConsumer[]
}

export interface LoginResponseData extends BaseData {
  success: boolean
  refreshToken: string
  accessToken: string
  user: {
    email: string
    roles: Role[]
  }
}

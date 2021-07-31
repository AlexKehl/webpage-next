export interface BaseData {
  success: boolean
}

export interface ImageForConsumer {
  name: string
  url: string
  category: string
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
  }
}

export interface BaseData {
  success: boolean
}

export interface LoginResponseData extends BaseData {
  success: boolean
  refreshToken: string
  accessToken: string
  user: {
    email: string
  }
}

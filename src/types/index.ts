import { FC } from 'react'
import { ImageSize } from './Dto'
import { TranslatedText } from './Texts'

export interface Photo {
  url: string
  width?: number
  height?: number
}

export interface Credentials {
  email: string
  password: string
}

export type Role = 'Admin' | 'RegisteredUser'

export interface User {
  email: string
  roles: Role[]
}

export interface FileMeta {
  name: string
  url: string
  category: string
  id: string
  description?: TranslatedText
  isForSell: boolean
  price?: number
  size: ImageSize
}

export type FileWithMeta = { file: File } & FileMeta

export type Category = 'acryl' | 'oil'

export type HOC = <T>(component: FC<T>) => FC<T>

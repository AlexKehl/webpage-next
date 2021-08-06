import { ImageSize } from './Dto'

export interface FileToUploadMeta {
  name: string
  description?: string
  isForSell: boolean
  price?: number
  size: ImageSize
}

export type FileToUpload = { file: File } & FileToUploadMeta

export interface FileMeta {
  name: string
  url: string
  category: string
  id: string
  description?: string
  isForSell: boolean
  price?: number
  size: ImageSize
}

export type FileWithMeta = { file: File } & FileMeta

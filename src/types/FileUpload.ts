import { ImageSize } from './Dto'

export interface FileToUpload {
  name: string
  description?: string
  isForSell: boolean
  price?: number
  size: ImageSize
  file: File
}

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

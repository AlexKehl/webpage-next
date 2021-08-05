import { ImageSize } from './Dto'
import { TranslatedText } from './Texts'

export interface FileToUpload {
  name: string
  description?: TranslatedText
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
  description?: TranslatedText
  isForSell: boolean
  price?: number
  size: ImageSize
}

export type FileWithMeta = { file: File } & FileMeta

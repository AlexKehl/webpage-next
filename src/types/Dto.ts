import { TranslatedText } from './Texts'

export interface ImageSize {
  width: number
  height: number
}

export interface ImageWithMeta {
  description?: TranslatedText
  isForSell: boolean
  price?: number
  image: string
  name: string
  size: ImageSize
}

export interface GalleryImageDto {
  images: ImageWithMeta[]
  category: string
}

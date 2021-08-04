import { TranslatedText } from './Texts'

export interface ImageWithMeta {
  description?: TranslatedText
  isForSell: boolean
  price?: number
  image: string
  name: string
}

export interface GalleryImageDto {
  images: ImageWithMeta[]
  category: string
}

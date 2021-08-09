import { Category } from '.'

export interface ImageSize {
  width: number
  height: number
}

export interface GalleryImageDto {
  description?: string
  isForSell: boolean
  price?: number
  image: string
  name: string
  size: ImageSize
  category: string
}

export interface DeleteGalleryImageDto {
  category: Category
  name: string
}

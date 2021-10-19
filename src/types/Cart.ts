import { GalleryImageMeta } from '../../common/interface/GalleryImages'
export interface CartItem extends GalleryImageMeta {}

export interface Cart {
  items: CartItem[]
}

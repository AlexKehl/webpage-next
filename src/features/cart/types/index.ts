import { GalleryImage } from 'src/types/PrismaProxy'

export interface CartItem extends GalleryImage {}

export interface Cart {
  items: CartItem[]
}

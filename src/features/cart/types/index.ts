import { GalleryImage } from '@prisma/client'

export interface CartItem extends GalleryImage {}

export interface Cart {
  items: CartItem[]
}

import { galleryImageDto } from 'common/fixtures/GalleryImages'
import { Cart } from 'src/features/cart/types'

export const testCart: Cart = {
  items: [galleryImageDto],
}

export const emptyCart: Cart = {
  items: [],
}

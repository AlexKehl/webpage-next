import { Cart } from 'src/types'
import { galleryImageDto } from 'common/fixtures/GalleryImages'

export const testCart: Cart = {
  items: [galleryImageDto],
}

export const emptyCart: Cart = {
  items: [],
}

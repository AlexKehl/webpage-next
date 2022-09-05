import cuid from 'cuid'
import { GalleryImage } from 'src/types/PrismaProxy'

export const GalleryImage1: GalleryImage = {
  id: cuid(),
  category: 'acryl',
  height: '5',
  width: '5',
  name: 'fooImage',
  url: 'barUrl',
}

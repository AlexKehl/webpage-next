import {
  galleryImageDto,
  generateGalleryImageDto,
} from '../../common/fixtures/GalleryImages'
import { FileWithMeta } from '../../src/types/GalleryImages'
import { v4 as uuid } from 'uuid'

export const fileWithMeta: FileWithMeta = {
  ...galleryImageDto,
  file: 'someFile' as unknown as File,
}

export const generateFileWithMeta = (): FileWithMeta => ({
  ...generateGalleryImageDto(),
  file: uuid() as unknown as File,
})

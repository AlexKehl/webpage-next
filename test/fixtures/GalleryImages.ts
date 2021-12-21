import faker from 'faker'
import {
  galleryImageDto,
  generateGalleryImageDto,
} from '../../common/fixtures/GalleryImages'
import { FileWithMeta } from '../../src/types/GalleryImages'

export const fileWithMeta: FileWithMeta = {
  ...galleryImageDto,
  file: 'someFile' as unknown as File,
}

export const generateFileWithMeta = (): FileWithMeta => ({
  ...generateGalleryImageDto(),
  file: faker.datatype.string(10) as unknown as File,
})

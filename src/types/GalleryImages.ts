import { GalleryImageMeta } from '../../common/interface/GalleryImages'

export type B64GalleryImageWithMeta = { image: string } & GalleryImageMeta

export type FileWithMeta = { file: File } & GalleryImageMeta

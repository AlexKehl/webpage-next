import axios from 'axios'
import {
  Endpoints,
  staticEndPointPart,
} from '../../../common/constants/Endpoints'
import { Category } from '../../../common/interface/Constants'
import { ImageForGallery } from '../../../common/interface/ConsumerData'
import { GalleryCategoryResponse } from '../../../common/interface/ConsumerResponses'
import {
  DeleteGalleryImageDto,
  GalleryImageDto,
} from '../../../common/interface/Dto'
import { GalleryImageMeta } from '../../../common/interface/GalleryImages'
import { API } from '../../constants/EnvProxy'
import { FileWithMeta } from '../../types/GalleryImages'
import { postJSON } from './Utils'

async function getBlobFromUrl(url: string): Promise<Blob> {
  const { data } = await axios({
    url,
    method: 'get',
    responseType: 'blob',
  })
  return data
}

const getGalleryFiles = async (
  category: string
): Promise<ImageForGallery[]> => {
  const { data } = await axios.get<GalleryCategoryResponse>(
    `${API}${staticEndPointPart('galleryCategoryList')}${category}`
  )
  return data.images
}

const getInitialGalleryFiles = async (
  category: Category
): Promise<FileWithMeta[]> => {
  const { data } = await axios.get<GalleryCategoryResponse>(
    `${API}${staticEndPointPart('galleryCategoryList')}${category}`
  )
  const blobPromises = data.images.map((image) =>
    getBlobFromUrl(`${API}${image.url}`)
  )
  const blobs = await Promise.all(blobPromises)
  const filesWithMeta: FileWithMeta[] = blobs.map((blob, idx) => {
    const currentImage = data.images[idx]!
    return {
      file: new File([blob], currentImage.name, { type: 'image/jpeg' }),
      name: currentImage.name,
      url: currentImage.url,
      category,
      isForSell: currentImage.isForSell,
      id: currentImage.id,
      width: currentImage.width,
      height: currentImage.height,
      price: currentImage.price,
      description: currentImage.description,
    }
  })
  return filesWithMeta
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = ''
  let bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]!)
  }
  return window.btoa(binary)
}

const uploadImage = async (
  fileWithMeta: { file: File } & Partial<GalleryImageMeta>
) => {
  const buffer = await fileWithMeta.file.arrayBuffer()
  const image = arrayBufferToBase64(buffer)

  const data: Partial<GalleryImageDto> = {
    ...fileWithMeta,
    image,
  }

  return postJSON({
    url: `${API}${Endpoints.galleryUpload}`,
    method: 'post',
    data: data! as GalleryImageDto,
    credentials: 'include',
  })
}

const deleteImage = async (category: Category, id: GalleryImageMeta['id']) => {
  const data: DeleteGalleryImageDto = {
    category,
    id,
  }
  return postJSON({
    url: `${API}${Endpoints.galleryDelete}`,
    method: 'post',
    data,
    credentials: 'include',
  })
}

export { getInitialGalleryFiles, getGalleryFiles, uploadImage, deleteImage }

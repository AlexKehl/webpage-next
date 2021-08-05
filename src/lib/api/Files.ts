import axios from 'axios'
import { API } from '../../../config'
import { Category, FileWithMeta } from '../../types'
import {
  GalleryCategoryResponse,
  ImageForConsumer,
} from '../../types/ApiResponses'
import { GalleryImageDto } from '../../types/Dto'
import { attemptProtectedRequest } from './Auth'

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
): Promise<ImageForConsumer[]> => {
  const { data } = await axios.get<GalleryCategoryResponse>(
    `${API}/files/${category}`
  )
  return data.images
}

const getInitialGalleryFiles = async (
  category: string
): Promise<FileWithMeta[]> => {
  const { data } = await axios.get<GalleryCategoryResponse>(
    `${API}/files/${category}`
  )
  const blobPromises = data.images.map((image) => getBlobFromUrl(image.url))
  const blobs = await Promise.all(blobPromises)
  const filesWithMeta: FileWithMeta[] = blobs.map((blob, idx) => ({
    file: new File([blob], data.images[idx].name, { type: 'image/jpeg' }),
    name: data.images[idx].name,
    url: data.images[idx].url,
    category,
    isForSell: data.images[idx].isForSell,
    id: data.images[idx].id,
    size: data.images[idx].size,
    price: data.images[idx].price,
    description: data.images[idx].description,
  }))
  return filesWithMeta
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = ''
  let bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

const syncGalleryFiles = (category: Category) => async (
  files: FileWithMeta[]
) => {
  const buffers = await Promise.all(
    files.map((file) => file.file.arrayBuffer())
  )

  const data: GalleryImageDto = {
    category,
    images: files.map((file, idx) => {
      const buffer = buffers[idx]
      const encoded = arrayBufferToBase64(buffer)
      return {
        image: encoded,
        name: file.file.name,
        isForSell: file.isForSell,
        size: file.size,
        price: file.price,
        description: file.description,
      }
    }),
  }
  return attemptProtectedRequest({
    url: `${API}/file/sync/gallery`,
    method: 'post',
    data,
  })
}

export { syncGalleryFiles, getInitialGalleryFiles, getGalleryFiles }

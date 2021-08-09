import axios from 'axios'
import { Category } from '../../../common/interface/Constants'
import { ImageForGallery } from '../../../common/interface/ConsumerData'
import { GalleryCategoryResponse } from '../../../common/interface/ConsumerResponses'
import {
  DeleteGalleryImageDto,
  GalleryImageDto,
} from '../../../common/interface/Dto'
import { API } from '../../../config'
import { FileWithMeta } from '../../types/GalleryImages'
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
): Promise<ImageForGallery[]> => {
  const { data } = await axios.get<GalleryCategoryResponse>(
    `${API}/files/${category}`
  )
  return data.images
}

const getInitialGalleryFiles = async (
  category: Category
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

const uploadImage = async (fileWithMeta: FileWithMeta) => {
  const buffer = await fileWithMeta.file.arrayBuffer()
  const image = arrayBufferToBase64(buffer)

  const data: GalleryImageDto = {
    ...fileWithMeta,
    image,
  }

  return attemptProtectedRequest({
    url: `${API}/file/gallery/upload`,
    method: 'post',
    data,
  })
}

const deleteImage = async (category: Category, name: string) => {
  const data: DeleteGalleryImageDto = {
    category,
    name,
  }
  return attemptProtectedRequest({
    url: `${API}/file/gallery/delete`,
    method: 'post',
    data,
  })
}

export { getInitialGalleryFiles, getGalleryFiles, uploadImage, deleteImage }

import axios from 'axios'
import { API } from '../../../config'
import { Category, FileToUpload, FileWithMeta } from '../../types'
import {
  GalleryCategoryResponse,
  ImageForConsumer,
} from '../../types/ApiResponses'
import { DeleteGalleryImageDto, GalleryImageDto } from '../../types/Dto'
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

const uploadImage = (category: Category) => async (file: FileToUpload) => {
  const buffer = await file.arrayBuffer()
  const image = arrayBufferToBase64(buffer)

  const data: GalleryImageDto = {
    ...file,
    category,
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

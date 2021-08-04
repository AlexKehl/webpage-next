import axios from 'axios'
import { IFileWithMeta } from 'react-dropzone-uploader'
import { API } from '../../../config'
import { BlobWithMeta, Category } from '../../types'
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
): Promise<BlobWithMeta[]> => {
  const { data } = await axios.get<GalleryCategoryResponse>(
    `${API}/files/${category}`
  )
  const blobPromises = data.images.map((image) => getBlobFromUrl(image.url))
  const blobs = await Promise.all(blobPromises)
  const blobsWithMeta: BlobWithMeta[] = blobs.map((blob, idx) => ({
    blob,
    name: data.images[idx].name,
  }))
  return blobsWithMeta
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
  files: IFileWithMeta[]
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
        isForSell: false,
      }
    }),
  }
  return attemptProtectedRequest({
    url: `${API}/file/sync/gallery`,
    method: 'post',
    data: data,
  })
}

export { syncGalleryFiles, getInitialGalleryFiles, getGalleryFiles }

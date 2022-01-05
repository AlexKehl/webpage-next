import axios from 'axios'
import { GalleryCategoryResponse } from 'common/interface/ConsumerResponses'
import { API } from 'src/constants/EnvProxy'
import { FileWithMeta } from 'src/features/gallery/types'

const getBlobFromUrl = async (url: string): Promise<Blob> => {
  const { data } = await axios({
    url,
    method: 'get',
    responseType: 'blob',
  })
  return data
}

export const serializeFilesWithMeta = async (
  categoryResponse: GalleryCategoryResponse
): Promise<FileWithMeta[]> => {
  const blobPromises = categoryResponse.images.map((image) =>
    getBlobFromUrl(`${API}${image.url}`)
  )
  const blobs = await Promise.all(blobPromises)
  const filesWithMeta: FileWithMeta[] = blobs.map((blob, idx) => {
    const currentImage = categoryResponse.images[idx]!
    return {
      file: new File([blob], currentImage.name, { type: 'image/jpeg' }),
      ...currentImage,
    }
  })
  return filesWithMeta
}

export const fileToBase64 = async (file: File) => {
  const buffer = await file.arrayBuffer()
  let binary = ''
  let bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]!)
  }
  return window.btoa(binary)
}

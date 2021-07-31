import axios from 'axios'
import { IFileWithMeta } from 'react-dropzone-uploader'
import { API } from '../../../config'
import { BlobWithMeta } from '../../types'
import { GalleryCategoryResponse } from '../../types/ApiResponses'

async function getBlobFromUrl(url: string): Promise<Blob> {
  const { data } = await axios({
    url,
    method: 'get',
    responseType: 'blob',
  })
  return data
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

const syncGalleryFiles = async (files: IFileWithMeta[]) => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('files', file.file)
  })

  formData.append('category', 'acryl')

  return axios.post(`${API}/file/sync/gallery`, formData)
}

export { syncGalleryFiles, getInitialGalleryFiles }
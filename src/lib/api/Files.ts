import axios from 'axios'
import { IFileWithMeta } from 'react-dropzone-uploader'
import { API } from '../../../config'
import { GalleryCategoryResponse } from '../../types/ApiResponses'

async function getFileFromUrl(url: string, name: string): Promise<File> {
  const { data } = await axios({
    url,
    method: 'get',
    responseType: 'blob',
  })
  let res: any = data
  res.lastModifiedDate = new Date()
  res.name = name

  return res
  // return {
  //   ...res,
  //   lastModifiedDate: new Date(),
  //   name,
  // }
  // res.lastModifiedDate = new Date()
  // res.name = name
  // return res
  // return fetch(url)
  //   .then((e) => {
  //     return e.blob()
  //   })
  //   .then((blob) => {
  //     let b: any = blob
  //     b.lastModifiedDate = new Date()
  //     b.name = name
  //
  //     return b as File
  //   })
}

const getInitialGalleryFiles = async (category: string): Promise<File[]> => {
  const { data } = await axios.get<GalleryCategoryResponse>(
    `${API}/files/${category}`
  )
  const filePromises = data.images.map((image) =>
    getFileFromUrl(image.url, image.name)
  )
  const res = await Promise.all(filePromises)
  return res
}

const syncGalleryFiles = async (files: IFileWithMeta[]) => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('files', file.file)
  })

  formData.append('category', 'acryl')
  const res = await axios.post(`${API}/file/sync/gallery`, formData)
  return res
}

export { syncGalleryFiles, getInitialGalleryFiles }

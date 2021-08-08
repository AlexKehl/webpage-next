import { FileToUpload } from '../../src/types'

export interface PreviewFormData {
  name: string
  description?: string
  isForSell: boolean
  price?: number
  width: number
  height: number
}

export interface FilesToUpload {
  [x: string]: FileToUpload
}

import { BlobWithMeta } from '../types'

const mapBlobsToFiles = (blobs: BlobWithMeta[]): File[] => {
  return blobs.map(
    (blob) => new File([blob.blob], blob.name, { type: 'image/jpeg' })
  )
}

export { mapBlobsToFiles }

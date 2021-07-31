import React, { FC, useEffect, useState } from 'react'
import Dropzone, { IFileWithMeta } from 'react-dropzone-uploader'
import { getInitialGalleryFiles } from '../lib/api/Files'
import { BlobWithMeta } from '../types'

interface Props {
  onSubmit: (files: IFileWithMeta[]) => void
  initialFiles?: File[]
}

const mapBlobsToFiles = (blobs: BlobWithMeta[]): File[] => {
  return blobs.map(
    (blob) => new File([blob.blob], blob.name, { type: 'image/jpeg' })
  )
}

const FileUpload: FC<Props> = ({ onSubmit }) => {
  const [initialFiles, setInitialFiles] = useState<File[]>([])

  useEffect(() => {
    getInitialGalleryFiles('acryl').then((files) => {
      setInitialFiles(mapBlobsToFiles(files))
    })
  }, [])
  return (
    <Dropzone
      onSubmit={onSubmit}
      accept="image/*"
      initialFiles={initialFiles}
    />
  )
}

export default FileUpload

// @refresh reset
import React, { FC, useEffect, useState } from 'react'
import Dropzone, { IFileWithMeta } from 'react-dropzone-uploader'
import { getInitialGalleryFiles } from '../lib/api/Files'
import { mapBlobsToFiles } from '../utils/Files'

interface Props {
  onSubmit: (files?: IFileWithMeta[]) => void
  category: string
}

const FileUpload: FC<Props> = ({ onSubmit, category }) => {
  const [initialFiles, setInitialFiles] = useState<File[]>()

  useEffect(() => {
    getInitialGalleryFiles(category).then(mapBlobsToFiles).then(setInitialFiles)
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

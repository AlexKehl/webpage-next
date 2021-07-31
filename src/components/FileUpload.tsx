import React, { FC, useEffect, useState } from 'react'
import Dropzone, { IFileWithMeta } from 'react-dropzone-uploader'
import { getInitialGalleryFiles } from '../lib/api/Files'

interface Props {
  onSubmit: (files: IFileWithMeta[]) => void
  initialFiles?: File[]
}

const FileUpload: FC<Props> = ({ onSubmit }) => {
  const [initialFiles, setInitialFiles] = useState<File[]>([])

  useEffect(() => {
    getInitialGalleryFiles('acryl').then((files) => {
      console.log(files)
      setInitialFiles(files)
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

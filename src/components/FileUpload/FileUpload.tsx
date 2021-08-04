// @refresh reset
import React, { FC, useEffect, useState } from 'react'
import Dropzone, { IFileWithMeta, StatusValue } from 'react-dropzone-uploader'
import { getInitialGalleryFiles } from '../../lib/api/Files'
import { mapBlobsToFiles } from '../../utils/Files'
import FileUploadPreview from './FileUploadGalleryPreview'

interface Props {
  onSubmit: (files?: IFileWithMeta[]) => void
  category: string
}

const FileUpload: FC<Props> = ({ onSubmit, category }) => {
  const [initialFiles, setInitialFiles] = useState<File[]>()

  useEffect(() => {
    getInitialGalleryFiles(category).then(mapBlobsToFiles).then(setInitialFiles)
  }, [])
  const onChangeStatus = (
    file: IFileWithMeta,
    status: StatusValue,
    allFiles: IFileWithMeta[]
  ) => {
    // console.log('file', file)
  }

  return (
    <Dropzone
      onSubmit={onSubmit}
      accept="image/*"
      initialFiles={initialFiles}
      onChangeStatus={onChangeStatus}
      PreviewComponent={FileUploadPreview}
    />
  )
}

export default FileUpload

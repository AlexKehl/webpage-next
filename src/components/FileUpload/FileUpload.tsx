// @refresh reset
import React, { FC, useEffect, useState } from 'react'
import Dropzone from 'react-dropzone-uploader'
import { getInitialGalleryFiles } from '../../lib/api/Files'
import { Category, FileToUpload } from '../../types'
import FileUploadPreview from './FileUploadGalleryPreview'

interface Props {
  category: Category
  onSubmit: (files?: FileToUpload[]) => void
}

interface FilesToUpload {
  [x: string]: FileToUpload
}

const FileUpload: FC<Props> = ({ category, onSubmit }) => {
  const [filesToUpload, setFilesToUpload] = useState<FilesToUpload>({})

  useEffect(() => {
    getInitialGalleryFiles(category).then((files) => {
      files.forEach((file) => {
        setFilesToUpload({
          ...filesToUpload,
          [file.name]: file,
        })
      })
      // setFilesToUpload(files)
    })
  }, [])

  const onFileFormSubmit = (file: FileToUpload) => {
    setFilesToUpload({
      ...filesToUpload,
      [file.name]: file,
    })
    // setFilesToUpload([...filesToUpload, file])
  }

  return (
    <Dropzone
      onSubmit={() => onSubmit(Object.values(filesToUpload))}
      accept="image/*"
      initialFiles={Object.values(filesToUpload)?.map(
        (fileToUpload) => fileToUpload.file
      )}
      PreviewComponent={(props) => (
        <FileUploadPreview
          {...props}
          category={category}
          onSubmit={onFileFormSubmit}
        />
      )}
    />
  )
}

export default FileUpload

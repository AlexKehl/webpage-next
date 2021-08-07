// @refresh reset
import React, { FC, useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { getInitialGalleryFiles } from '../lib/api/Files'
import { Category, FileToUpload } from '../types'
import FileUploadPreview from '../../pages/gallery/FileUploadGalleryPreview'
import { omit } from 'lodash/fp'
import { Button } from '@chakra-ui/react'

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
      const initialFiles = files.reduce((acc, file) => {
        return {
          ...acc,
          [file.name]: file,
        }
      }, {})
      setFilesToUpload(initialFiles)
    })
  }, [])

  const onFileFormSubmit = (file: FileToUpload) => {
    setFilesToUpload({
      ...filesToUpload,
      [file.name]: file,
    })
  }

  const deleteFile = (fileName: string) => {
    setFilesToUpload(omit(fileName, filesToUpload))
  }

  return (
    <div>
      {Object.values(filesToUpload).map((file, idx) => {
        return (
          <FileUploadPreview
            key={idx}
            onSubmit={onFileFormSubmit}
            deleteFile={deleteFile}
            {...file}
          />
        )
      })}
      <Dropzone
        accept="image/*"
        onDrop={(acceptedFiles: any) => {
          setFilesToUpload({
            ...filesToUpload,
            [acceptedFiles[0].name]: { file: acceptedFiles[0] },
          })
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="w-12">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button className="m-2">Add File</Button>
            </div>
          </section>
        )}
      </Dropzone>
      <Button
        className="m-2"
        onClick={() => onSubmit(Object.values(filesToUpload))}
      >
        Submit
      </Button>
    </div>
  )
}

export default FileUpload

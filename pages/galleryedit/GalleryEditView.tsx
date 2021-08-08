// @refresh reset
import { Button } from '@chakra-ui/react'
import React, { FC } from 'react'
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone'
import { FileToUpload } from '../../src/types'
import FileUploadPreviewContainer from './GalleryUploadPreviewContainer'
import { FilesToUpload } from './types'

interface Props {
  onDelete: (fileName: string) => void
  onSubmit: () => void
  onAddFiles: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void
  onPreviewConfirm: (file: FileToUpload) => void
  filesToUpload: FilesToUpload
}

const GalleryEditView: FC<Props> = ({
  onSubmit,
  onDelete,
  onPreviewConfirm,
  filesToUpload,
  onAddFiles,
}) => {
  return (
    <div>
      {Object.values(filesToUpload).map((file, idx) => {
        return (
          <FileUploadPreviewContainer
            key={idx}
            onPreviewConfirm={onPreviewConfirm}
            onDelete={onDelete}
            {...file}
          />
        )
      })}
      <Dropzone accept="image/*" onDrop={onAddFiles}>
        {({ getRootProps, getInputProps }) => (
          <section className="w-12">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button className="m-2">Add File</Button>
            </div>
          </section>
        )}
      </Dropzone>
      <Button className="m-2" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  )
}

export default GalleryEditView

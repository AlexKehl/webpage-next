// @refresh reset
import { Button } from '@chakra-ui/react'
import React, { FC } from 'react'
import Dropzone from 'react-dropzone'
import { FileWithMeta } from '../../src/types/GalleryImages'
import GalleryUploadPreviewContainer from './GalleryUploadPreviewContainer'

interface Props {
  filesList: FileWithMeta[]
  onAddFiles: (x: any) => void
  onRemoveFile: (fileName: string) => void
}

const GalleryEditView: FC<Props> = ({
  filesList,
  onAddFiles,
  onRemoveFile,
}) => {
  return (
    <div>
      {filesList?.map((fileWithMeta, idx) => {
        return (
          <GalleryUploadPreviewContainer
            key={idx}
            fileWithMeta={fileWithMeta}
            onRemoveFile={onRemoveFile}
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
    </div>
  )
}

export default GalleryEditView

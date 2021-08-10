// @refresh reset
import { Button } from '@chakra-ui/react'
import React, { FC } from 'react'
import Dropzone from 'react-dropzone'
import { Category } from '../../common/interface/Constants'
import { GalleryImageMeta } from '../../common/interface/GalleryImages'
import { FileWithMeta } from '../../src/types/GalleryImages'
import GalleryUploadPreviewContainer from './GalleryUploadPreviewContainer'

interface Props {
  filesList: ({ file: File } & Partial<GalleryImageMeta>)[]
  onAddFiles: (x: any) => void
  onRemoveFile: (fileName: string) => void
  category: Category
}

const GalleryEditView: FC<Props> = ({
  filesList,
  onAddFiles,
  onRemoveFile,
  category,
}) => {
  return (
    <div>
      {filesList?.map((fileWithMeta, idx) => {
        const { file, ...fileMeta } = fileWithMeta
        return (
          <GalleryUploadPreviewContainer
            key={idx}
            category={category}
            fileMeta={fileMeta}
            file={file}
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

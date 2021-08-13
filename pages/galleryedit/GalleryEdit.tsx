import { Button } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { Category } from '../../common/interface/Constants'
import { GalleryImageMeta } from '../../common/interface/GalleryImages'
import { getInitialGalleryFiles } from '../../src/lib/api/Files'
import GalleryUploadPreviewContainer from './GalleryUploadPreview'

interface Props {
  category: Category
}

const GalleryEdit: FC<Props> = ({ category }) => {
  const [filesList, setFilesList] = useState<
    ({ file: File } & Partial<GalleryImageMeta>)[]
  >([])

  useEffect(() => {
    getInitialGalleryFiles(category).then(setFilesList)
  }, [])

  const onAddFiles = (acceptedFiles: File[]) => {
    setFilesList([...filesList, ...acceptedFiles.map((file) => ({ file }))])
  }

  const onRemoveFile = (fileName: string) => {
    setFilesList(
      filesList.filter((file) => (file.name || file.file.name) !== fileName)
    )
  }

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

export default GalleryEdit

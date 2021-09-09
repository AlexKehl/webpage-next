import { Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { Category } from '../../common/interface/Constants'
import { GalleryImageMeta } from '../../common/interface/GalleryImages'
import WithHeader from './HOC/WithHeader'
import { getInitialGalleryFiles } from '../lib/api/Files'
import GalleryUploadPreviewContainer from './GalleryUploadPreview'
import useI18n from '../lib/hooks/useI18n'

interface Props {
  category: Category
}

const GalleryEdit = ({ category }: Props) => {
  const { t } = useI18n()
  const [filesList, setFilesList] = useState<
    ({ file: File } & Partial<GalleryImageMeta>)[]
  >([])

  useEffect(() => {
    getInitialGalleryFiles(category).then(setFilesList)
  }, [category])

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
              <Button className="m-2">{t.addFile}</Button>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  )
}

export default WithHeader(GalleryEdit)

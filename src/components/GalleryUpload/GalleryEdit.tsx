import { Button, Center, Flex, VStack } from '@chakra-ui/react'
import React, { Fragment, useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { Category } from '../../../common/interface/Constants'
import { GalleryImageMeta } from '../../../common/interface/GalleryImages'
import { getInitialGalleryFiles } from '../../lib/api/Files'
import useI18n from '../../lib/hooks/useI18n'
import WithHeader from '../HOC/WithHeader'
import GalleryUploadPreview from './GalleryUploadPreview'

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
    <VStack>
      <Flex wrap="wrap" justifyContent="center">
        {filesList?.map((fileWithMeta, idx) => {
          const { file, ...fileMeta } = fileWithMeta
          return (
            <GalleryUploadPreview
              key={idx}
              category={category}
              fileMeta={fileMeta}
              file={file}
              onRemoveFile={onRemoveFile}
            />
          )
        })}
      </Flex>
      <Dropzone accept="image/*" onDrop={onAddFiles}>
        {({ getRootProps, getInputProps }) => (
          <Fragment>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button m="2">{t.addFile}</Button>
            </div>
          </Fragment>
        )}
      </Dropzone>
    </VStack>
  )
}

export default WithHeader(GalleryEdit)

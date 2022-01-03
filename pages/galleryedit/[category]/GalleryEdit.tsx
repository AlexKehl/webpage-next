import { Button, Flex, VStack } from '@chakra-ui/react'
import React, { Fragment, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import { Category } from '../../../common/interface/Constants'
import useI18n from '../../../src/lib/hooks/useI18n'
import { useAppDispatch, useAppSelector } from '../../../src/redux/hooks'
import { useImagesQuery } from '../../../src/redux/services/serverApi'
import {
  gallerySelector,
  galleryActions,
} from '../../../src/redux/slices/gallerySlice'
import GalleryUploadPreview from './GalleryUploadPreview'

interface Props {
  category: Category
}

const GalleryEdit = ({ category }: Props) => {
  const { t } = useI18n()
  const dispatch = useAppDispatch()
  const { images } = useAppSelector(gallerySelector)
  const { data } = useImagesQuery(category)

  useEffect(() => {
    dispatch(galleryActions.setImages(data))
  }, [data])

  const onFileDropHandler = (files: File[]) => {
    dispatch(galleryActions.addFiles({ files, category }))
  }

  return (
    <VStack>
      <Flex wrap="wrap" justifyContent="center">
        {images?.map((fileWithMeta, idx) => {
          return (
            <GalleryUploadPreview
              key={idx}
              category={category}
              fileWithMeta={fileWithMeta}
            />
          )
        })}
      </Flex>
      <Dropzone accept="image/*" onDrop={onFileDropHandler}>
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

export default GalleryEdit

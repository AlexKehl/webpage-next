import { VStack, Flex, Button, useUpdateEffect } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import Dropzone from 'react-dropzone'
import { Category } from '../../../common/interface/Constants'
import useI18n from '../../lib/hooks/useI18n'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useImagesQuery } from '../../redux/services/serverApi'
import {
  gallerySelector,
  galleryActions,
} from '../../redux/slices/gallerySlice'
import GalleryUploadPreview from './GalleryUploadPreview'

interface Props {
  category: Category
}

const GalleryEdit = ({ category }: Props) => {
  const { t } = useI18n()
  const dispatch = useAppDispatch()
  const { images } = useAppSelector(gallerySelector)

  const { data } = useImagesQuery(category)

  useUpdateEffect(() => {
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

// @refresh reset
import { Button } from '@chakra-ui/react'
import React, { FC } from 'react'
import Dropzone from 'react-dropzone'
import { Category } from '../../common/interface/Constants'
import { GalleryImageMeta } from '../../common/interface/GalleryImages'
import { FileWithMeta } from '../../src/types/GalleryImages'
import GalleryUploadPreviewContainer from './GalleryUploadPreview'

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
  )
}

export default GalleryEditView

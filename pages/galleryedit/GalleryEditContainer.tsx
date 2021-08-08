import { GetStaticPaths, GetStaticProps } from 'next'
import React, { FC, useEffect, useState } from 'react'
import WithHeader from '../../src/components/HOC/WithHeader'
import Categories from '../../src/constants/Categories'
import {
  getInitialGalleryFiles,
  syncGalleryFiles,
} from '../../src/lib/api/Files'
import { Category, FileToUpload } from '../../src/types'
import { generateCategoryPaths } from '../../src/utils/PathsGenerator'
import useApi from '../../src/lib/hooks/useApi'
import { omit } from 'lodash/fp'
import GalleryEditView from './GalleryEditView'
import { FilesToUpload } from './types'

interface Props {
  category: Category
}

const GalleryEdit: FC<Props> = ({ category }) => {
  const { validatedRequest } = useApi()
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

  const onPreviewConfirm = (file: FileToUpload) => {
    setFilesToUpload({
      ...filesToUpload,
      [file.name]: file,
    })
  }

  const onAddFiles = (acceptedFiles: any) => {
    setFilesToUpload({
      ...filesToUpload,
      [acceptedFiles[0].name]: { file: acceptedFiles[0] },
    })
  }

  const onDelete = (fileName: string) => {
    setFilesToUpload(omit(fileName, filesToUpload))
  }

  const onSubmit = () => {
    validatedRequest(() =>
      syncGalleryFiles(category)(Object.values(filesToUpload))
    )
  }

  return (
    <GalleryEditView
      onSubmit={onSubmit}
      onDelete={onDelete}
      filesToUpload={filesToUpload}
      onPreviewConfirm={onPreviewConfirm}
      onAddFiles={onAddFiles}
    />
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  return {
    paths: generateCategoryPaths({ locales, categories: Categories }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  return {
    props: {
      category: params.category as Category,
    },
  }
}

export default WithHeader(GalleryEdit)

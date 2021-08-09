import { GetStaticPaths, GetStaticProps } from 'next'
import React, { FC, useEffect, useState } from 'react'
import WithHeader from '../../src/components/HOC/WithHeader'
import Categories from '../../src/constants/Categories'
import { getInitialGalleryFiles } from '../../src/lib/api/Files'
import { Category, FileWithMeta } from '../../src/types'
import { generateCategoryPaths } from '../../src/utils/PathsGenerator'
import GalleryEditView from './GalleryEditView'

interface Props {
  category: Category
}

const GalleryEdit: FC<Props> = ({ category }) => {
  const [filesList, setFilesList] = useState<FileWithMeta[]>()

  useEffect(() => {
    getInitialGalleryFiles(category).then(setFilesList)
  }, [])

  const onAddFiles = (acceptedFiles: any[]) => {
    setFilesList([...filesList, ...acceptedFiles])
  }

  const onRemoveFile = (fileName: string) => {
    setFilesList(filesList.filter((file) => file.name !== fileName))
  }

  return (
    <GalleryEditView
      filesList={filesList}
      onAddFiles={onAddFiles}
      onRemoveFile={onRemoveFile}
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

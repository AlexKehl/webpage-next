import { GetStaticPaths, GetStaticProps } from 'next'
import React, { FC, useEffect, useState } from 'react'
import Categories from '../../common/constants/Categories'
import { Category } from '../../common/interface/Constants'
import { GalleryImageMeta } from '../../common/interface/GalleryImages'
import WithHeader from '../../src/components/HOC/WithHeader'
import { getInitialGalleryFiles } from '../../src/lib/api/Files'
import { generateCategoryPaths } from '../../src/utils/PathsGenerator'
import GalleryEditView from './GalleryEditView'

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
    <GalleryEditView
      category={category}
      filesList={filesList}
      onAddFiles={onAddFiles}
      onRemoveFile={onRemoveFile}
    />
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  return {
    paths: generateCategoryPaths({ locales, categories: Categories }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  return {
    props: {
      category: params?.['category'] as Category,
    },
  }
}

export default WithHeader(GalleryEdit)

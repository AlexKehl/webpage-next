import { GetStaticPaths, GetStaticProps } from 'next'
import React, { FC } from 'react'
import FileUpload from '../../src/components/FileUpload/FileUpload'
import WithHeader from '../../src/components/HOC/WithHeader'
import Categories from '../../src/constants/Categories'
import { syncGalleryFiles } from '../../src/lib/api/Files'
import { Category } from '../../src/types'
import { generateCategoryPaths } from '../../src/utils/PathsGenerator'

interface Props {
  category: Category
}

const GalleryEdit: FC<Props> = ({ category }) => {
  return (
    <div>
      <FileUpload onSubmit={syncGalleryFiles(category)} category={category} />
    </div>
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

import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { generateCategoryPaths } from 'src/utils/PathsGenerator'
import GalleryEdit from 'src/features/gallery/components/GalleryEdit'
import { Category } from '@prisma/client'
import { Categories } from 'src/constants'

interface Props {
  category: Category
}

const CategoryEditPage = (props: Props) => {
  return <GalleryEdit {...props} />
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

export default CategoryEditPage

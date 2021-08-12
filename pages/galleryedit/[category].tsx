import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import Categories from '../../common/constants/Categories'
import { Category } from '../../common/interface/Constants'
import { generateCategoryPaths } from '../../src/utils/PathsGenerator'
import GalleryEdit from './GalleryEdit'

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

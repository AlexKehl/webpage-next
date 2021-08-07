import { GetStaticPaths, GetStaticProps } from 'next'
import React, { FC } from 'react'
import FileUpload from '../../src/components/FileUpload'
import WithHeader from '../../src/components/HOC/WithHeader'
import Categories from '../../src/constants/Categories'
import { syncGalleryFiles } from '../../src/lib/api/Files'
import { Category } from '../../src/types'
import { generateCategoryPaths } from '../../src/utils/PathsGenerator'
import useApi from '../../src/lib/hooks/useApi'

interface Props {
  category: Category
}

const GalleryEdit: FC<Props> = ({ category }) => {
  const { validatedRequest } = useApi()
  return (
    <div>
      <FileUpload
        onSubmit={(files) =>
          validatedRequest(() => syncGalleryFiles(category)(files))
        }
        category={category}
      />
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

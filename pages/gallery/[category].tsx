import { GetStaticPaths, GetStaticProps } from 'next'
import Categories from '../../common/constants/Categories'
import { Category } from '../../common/interface/Constants'
import { generateCategoryPaths } from '../../src/utils/PathsGenerator'
import Gallery from '../../src/components/Gallery'
import WithHeader from '../../src/components/HOC/WithHeader'

interface Props {
  category: Category
}

const GalleryPage = ({ category }: Props) => {
  return <Gallery category={category} />
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => ({
  paths: generateCategoryPaths({ locales, categories: Categories }),
  fallback: true,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  return {
    props: {
      category: params?.['category'] as Category,
    },
  }
}

export default WithHeader(GalleryPage)

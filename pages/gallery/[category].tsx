import { GetStaticPaths, GetStaticProps } from 'next'
import Categories from '../../common/constants/Categories'
import { Category } from '../../common/interface/Constants'
import { ImageForGallery } from '../../common/interface/ConsumerData'
import { getGalleryFiles } from '../../src/lib/api/Files'
import { generateCategoryPaths } from '../../src/utils/PathsGenerator'
import Gallery from '../../src/components/Gallery'

interface Props {
  category: Category
}

const GalleryPage = (props: Props) => {
  return <Gallery {...props} />
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => ({
  paths: generateCategoryPaths({ locales, categories: Categories }),
  fallback: true,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const images = await getGalleryFiles(params?.['category'] as string)
  return {
    props: {
      category: params?.['category'] as Category,
    },
  }
}

export default GalleryPage

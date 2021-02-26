import Gallery from '../../components/Gallery'
import WithHeader from '../../components/WithHeader'
import CATEGORIES from '../../constants/Categories'
import CATEGORY_PICTURE_MAP from '../../constants/CategoryPictures'
import { generateCategoryPaths } from '../../utils/PathsGenerator.js'

export const GalleryPage = ({ photos }) => <Gallery photos={photos} />

export async function getStaticPaths({ locales }) {
  return {
    paths: generateCategoryPaths({ locales, categories: CATEGORIES }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      photos: CATEGORY_PICTURE_MAP[params.category],
    },
  }
}

export default WithHeader(GalleryPage)

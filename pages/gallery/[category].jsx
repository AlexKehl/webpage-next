import Gallery from '../../components/Gallery'
import WithHeader from '../../components/WithHeader'
import CATEGORIES from '../../constants/Categories'
import CATEGORY_PICTURE_MAP from '../../constants/CategoryPictures'
import { generateCategoryPaths } from '../../utils/PathsGenerator.js'

export const GalleryPage = ({ photos }) => (
  <div className="container">
    <Gallery photos={photos} />
  </div>
)

export async function getStaticPaths({ locales }) {
  return {
    paths: generateCategoryPaths({ locales, CATEGORIES }),
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

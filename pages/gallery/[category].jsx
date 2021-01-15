import Gallery from '../../components/Gallery'
import WithHeader from '../../components/WithHeader'
import CATEGORIES from '../../constants/Categories'
import CATEGORY_PICTURE_MAP from '../../constants/CategoryPictures'

import axios from 'axios'

export const GalleryPage = ({ photos }) => (
  <div className="container">
    <Gallery photos={photos} />
  </div>
)

export function getAllPicturesForCategory(category) {
  return
  // return axios.get(
  //   `${process.env.SERVER_URL}/picturelist/?category=${category}`
  // )
}

export async function getStaticPaths() {
  return {
    paths: CATEGORIES.map((category) => ({ params: { category } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // const picturesForCategory = await getAllPicturesForCategory(params.category)
  return {
    props: {
      photos: CATEGORY_PICTURE_MAP[params.category],
    },
  }
}

export default WithHeader(GalleryPage)

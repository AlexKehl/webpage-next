import Gallery from '../components/Gallery'
import WithHeader from '../components/WithHeader'

export const GalleryPage = () => (
  <div className="container">
    <Gallery />
  </div>
)

export default WithHeader(GalleryPage)

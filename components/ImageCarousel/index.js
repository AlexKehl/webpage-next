import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

const images = [
  {
    original:
      'https://www.itl.cat/pngfile/big/14-146662_ocean-wallpaper-high-resolution-wallpaper-high-resolution-ocean.jpg',
    thumbnail:
      'https://www.itl.cat/pngfile/big/14-146662_ocean-wallpaper-high-resolution-wallpaper-high-resolution-ocean.jpg',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
]

const ImageCarousel = () => {
  return (
    <div>
      <ImageGallery
        showNav={true}
        showPlayButton={false}
        showFullscreenButton={true}
        items={images}
        thumbnailPosition={'bottom'}
      />
    </div>
  )
}

export default ImageCarousel

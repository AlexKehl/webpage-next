import { useState } from 'react'
import PhotoGallery from 'react-photo-gallery'
import useStyles from './styles'
import Lightbox from 'react-image-lightbox'

const Gallery = ({ photos }) => {
  const classes = useStyles()

  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = (event, { index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  const photosSrc = photos.map(({ src }) => src)

  return (
    <div className={classes.container}>
      <div />
      <div>
        <PhotoGallery photos={photos} onClick={openLightbox} />
        {viewerIsOpen && (
          <Lightbox
            imagePadding={0}
            mainSrc={photosSrc[currentImage]}
            nextSrc={photosSrc[(currentImage + 1) % photosSrc.length]}
            prevSrc={
              photosSrc[
                (currentImage + photosSrc.length - 1) % photosSrc.length
              ]
            }
            onCloseRequest={closeLightbox}
            onMovePrevRequest={() =>
              setCurrentImage(
                (currentImage + photosSrc.length - 1) % photosSrc.length
              )
            }
            onMoveNextRequest={() =>
              setCurrentImage((currentImage + 1) % photosSrc.length)
            }
          />
        )}
      </div>
      <div />
    </div>
  )
}
export default Gallery

import { useState } from 'react'
import PhotoGallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from 'react-images'
import useStyles from './styles'
import photos from './photos'

const Gallery = () => {
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

  return (
    <div className={classes.container}>
      <div />
      <div>
        <PhotoGallery photos={photos} onClick={openLightbox} />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={photos.map(photo => ({
                  ...photo,
                  source: photo.src,
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
      <div />
    </div>
  )
}
export default Gallery

import PhotoGallery from 'react-photo-gallery'
import Lightbox from 'react-image-lightbox'
import styles from './index.module.css'

const Gallery = ({
  photos,
  openLightbox,
  closeLightbox,
  isViewerOpen,
  photosSrc,
  currentImage,
  setCurrentImage,
}) => (
  <div className={styles.container}>
    <div />
    <div>
      <PhotoGallery photos={photos} onClick={openLightbox} />
      {isViewerOpen && (
        <Lightbox
          imagePadding={0}
          mainSrc={photosSrc[currentImage]}
          nextSrc={photosSrc[(currentImage + 1) % photosSrc.length]}
          prevSrc={
            photosSrc[(currentImage + photosSrc.length - 1) % photosSrc.length]
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
  </div>
)

export default Gallery

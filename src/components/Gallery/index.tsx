import React, { FC } from 'react'
import PhotoGallery from 'react-photo-gallery'
import Lightbox from 'react-image-lightbox'
import styles from './index.module.css'
import { Photo } from '../../types'

interface GalleryProps {
  photos: Photo[]
  openLightbox: (event: any, obj: { index: number }) => void
  closeLightbox: () => void
  isViewerOpen: boolean
  photosSrc: string[]
  currentImage: number
  setCurrentImage: (idx: number) => void
}

const defaultProps = {
  currentImage: 0,
}

const Gallery: FC<GalleryProps & typeof defaultProps> = ({
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

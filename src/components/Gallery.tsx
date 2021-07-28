import React, { FC } from 'react'
import Lightbox from 'react-image-lightbox'
import { Photo } from '../types'

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
  <div className="max-w-6xl mx-auto">
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
)

export default Gallery

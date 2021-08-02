import React, { FC } from 'react'
import Lightbox from 'react-image-lightbox'
import { Photo } from '../types'
import WithHeader from './WithHeader'

interface GalleryProps {
  photos: Photo[]
  openLightbox: (event: any, obj: { index: number }) => void
  closeLightbox: () => void
  isViewerOpen: boolean
  photosUrl: string[]
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
  photosUrl,
  currentImage,
  setCurrentImage,
}) => (
  <div className="max-w-6xl">
    {photos.map((photo, index) => (
      <img
        width={'200px'}
        height={'100px'}
        src={photo.url}
        onClick={(event) => openLightbox(event, { index })}
      />
    ))}
    {isViewerOpen && (
      <Lightbox
        imagePadding={0}
        mainSrc={photosUrl[currentImage]}
        nextSrc={photosUrl[(currentImage + 1) % photosUrl.length]}
        prevSrc={
          photosUrl[(currentImage + photosUrl.length - 1) % photosUrl.length]
        }
        onCloseRequest={closeLightbox}
        onMovePrevRequest={() =>
          setCurrentImage(
            (currentImage + photosUrl.length - 1) % photosUrl.length
          )
        }
        onMoveNextRequest={() =>
          setCurrentImage((currentImage + 1) % photosUrl.length)
        }
      />
    )}
  </div>
)

export default WithHeader(Gallery)

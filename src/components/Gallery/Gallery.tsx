import { Button } from '@chakra-ui/react'
import { NextRouter } from 'next/router'
import React, { FC } from 'react'
import Lightbox from 'react-image-lightbox'
import { Photo, User } from '../../types'
import { hasRole } from '../../utils/UserUtils'
import ImagePresenter from '../ImagePresenter'

interface GalleryProps {
  photos: Photo[]
  openLightbox: (event: any, obj: { index: number }) => void
  closeLightbox: () => void
  isViewerOpen: boolean
  photosUrl: string[]
  currentImage: number
  setCurrentImage: (idx: number) => void
  onEdit: (event: any) => void
  user: User
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
  onEdit,
  user,
}) => (
  <div className="max-w-5xl m-auto mt-3">
    {hasRole(user, 'Admin') && (
      <div className="flex flex-row-reverse">
        <Button onClick={onEdit}>Edit</Button>
      </div>
    )}
    {photos.map((photo, index) => (
      <ImagePresenter
        key={index}
        url={photo.url}
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

export default Gallery

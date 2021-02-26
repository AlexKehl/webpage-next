import { useDispatch, useSelector } from 'react-redux'
import {
  openLightbox,
  closeLightbox,
  setCurrentImage,
  selectIsViewerOpen,
  selectCurrentImage,
} from '../../redux/slices/gallerySlice'
import useStyles from './styles'
import Gallery from './Gallery'

const GalleryContainer = ({ photos }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isViewerOpen = useSelector(selectIsViewerOpen)
  const currentImage = useSelector(selectCurrentImage)

  const photosSrc = photos.map(({ src }) => src)

  return (
    <Gallery
      photos={photos}
      classes={classes}
      openLightbox={(event, idx) => dispatch(openLightbox(idx))}
      closeLightbox={() => dispatch(closeLightbox())}
      isViewerOpen={isViewerOpen}
      photosSrc={photosSrc}
      currentImage={currentImage}
      setCurrentImage={(idx) => dispatch(setCurrentImage(idx))}
    />
  )
}
export default GalleryContainer

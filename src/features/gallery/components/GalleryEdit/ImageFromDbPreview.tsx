import { GalleryImage } from 'src/types/PrismaProxy'
import { useContext, useMutation } from 'src/utils/Trpc'
import ImagePreview from './ImagePreview'

interface Props {
  image: GalleryImage
}

const ImageFromDbPreview = ({ image }: Props) => {
  const { invalidateQueries } = useContext()

  const { mutate: deleteImage } = useMutation('gallery.delete', {
    onSuccess: () => {
      invalidateQueries(['gallery.imagesList'])
    },
  })

  const { mutate: updateImage } = useMutation('gallery.update', {
    onSuccess: () => {
      invalidateQueries(['gallery.imagesList'])
    },
  })

  return (
    <ImagePreview
      isForSell={image.isForSell}
      onSubmit={(data) => updateImage({ ...data, id: image.id })}
      onDelete={() => deleteImage({ id: image.id })}
      defaultValues={image}
      url={image.url}
    />
  )
}

export default ImageFromDbPreview

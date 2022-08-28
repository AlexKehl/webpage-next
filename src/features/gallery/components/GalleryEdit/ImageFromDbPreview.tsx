import useToasts from 'src/lib/hooks/useToasts'
import { GalleryImage } from 'src/types/PrismaProxy'
import { useContext, useMutation } from 'src/utils/Trpc'
import ImagePreview from './ImagePreview'

interface Props {
  image: GalleryImage
}

const ImageFromDbPreview = ({ image }: Props) => {
  const { invalidateQueries } = useContext()
  const { showSuccessToast } = useToasts()

  const { mutate: deleteImage } = useMutation('gallery.delete', {
    onSuccess: () => {
      invalidateQueries(['gallery.imagesList'])
      showSuccessToast()
    },
  })

  const { mutate: updateImage } = useMutation('gallery.update', {
    onSuccess: () => {
      showSuccessToast()
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

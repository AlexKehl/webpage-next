import useI18n from 'src/lib/hooks/useI18n'
import useToasts from 'src/lib/hooks/useToasts'
import { GalleryImage } from 'src/types/PrismaProxy'
import { useContext, useMutation } from 'src/utils/Trpc'
import ImagePreview from './ImagePreview'

interface Props {
  image: GalleryImage
}

const ImageFromDbPreview = ({ image }: Props) => {
  const { t } = useI18n()
  const { invalidateQueries } = useContext()
  const { showSuccessToast } = useToasts()

  const { mutate: deleteImage } = useMutation('gallery.delete', {
    onSuccess: () => {
      invalidateQueries(['gallery.imagesList'])
      invalidateQueries(['cart.list'])
      showSuccessToast(t.successfullySubmitted)
    },
  })

  const { mutate: updateImage } = useMutation('gallery.update', {
    onSuccess: () => {
      showSuccessToast(t.successfullySubmitted)
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

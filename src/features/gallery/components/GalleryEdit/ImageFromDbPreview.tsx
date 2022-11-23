import useI18n from 'src/lib/hooks/useI18n'
import useToasts from 'src/lib/hooks/useToasts'
import { GalleryImage } from 'src/types/PrismaProxy'
import { trpc } from 'src/utils/Trpc'
import ImagePreview from './ImagePreview'

interface Props {
  image: GalleryImage
}

const ImageFromDbPreview = ({ image }: Props) => {
  const { t } = useI18n()
  const utils = trpc.useContext()
  const { showSuccessToast } = useToasts()

  const { mutate: deleteImage } = trpc.galleryImageRouter.delete.useMutation({
    onSuccess: () => {
      utils.galleryImageRouter.imagesList.invalidate()
      utils.cartRouter.list.invalidate()
      showSuccessToast(t.successfullySubmitted)
    },
  })

  const { mutate: updateImage } = trpc.galleryImageRouter.update.useMutation({
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

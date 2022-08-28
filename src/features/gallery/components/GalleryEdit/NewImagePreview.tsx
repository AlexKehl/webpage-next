import { Category } from 'common/interface/Constants'
import { useMemo } from 'react'
import { GalleryImage } from 'src/types/PrismaProxy'
import { useContext, useMutation } from 'src/utils/Trpc'
import { uploadFile } from '../../api'
import ImagePreview from './ImagePreview'

interface Props {
  category: Category
  file: File
  onRemove: () => void
}

const NewImagePreview = ({ category, file, onRemove }: Props) => {
  const { invalidateQueries } = useContext()

  const { mutate: saveImage } = useMutation('gallery.save', {
    onSuccess: () => {
      onRemove()
      invalidateQueries(['gallery.imagesList'])
    },
  })

  const onSubmitHandler = async (
    data: Omit<GalleryImage, 'url' | 'id' | 'category'>
  ) => {
    if (!file) {
      return
    }
    const url = await uploadFile(file)
    saveImage({ ...data, url, category })
  }

  const imageSrc = useMemo(
    () => file && URL.createObjectURL(file),
    [file?.name]
  )

  return (
    <ImagePreview
      onSubmit={onSubmitHandler}
      onDelete={onRemove}
      url={imageSrc}
      defaultValues={{ name: file.name }}
    />
  )
}

export default NewImagePreview

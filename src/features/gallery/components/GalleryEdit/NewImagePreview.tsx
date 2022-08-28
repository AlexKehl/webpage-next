import { Category } from '@prisma/client'
import { Fragment, useMemo, useState } from 'react'
import FullPageLoader from 'src/components/FullPageLoader'
import Env from 'src/constants/EnvProxy'
import useToasts from 'src/lib/hooks/useToasts'
import { GalleryImage } from 'src/types/PrismaProxy'
import { useContext, useMutation } from 'src/utils/Trpc'
import ImagePreview from './ImagePreview'

interface Props {
  category: Category
  file: File
  onRemove: () => void
}

const NewImagePreview = ({ category, file, onRemove }: Props) => {
  const { invalidateQueries, client } = useContext()
  const [isUploading, setIsUploading] = useState(false)
  const { showSuccessToast } = useToasts()

  const { mutate: saveImage } = useMutation('gallery.save', {
    onSuccess: () => {
      onRemove()
      invalidateQueries(['gallery.imagesList'])
      showSuccessToast()
    },
  })

  const onSubmitHandler = async (
    data: Omit<GalleryImage, 'url' | 'id' | 'category'>
  ) => {
    const { uploadUrl, id } = await client.query('s3.getUploadUrl', {
      name: file.name,
      contentType: file.type,
    })

    setIsUploading(true)
    await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-type': file.type,
        'Access-Control-Allow-Origin': '*',
      },
    })
    setIsUploading(false)

    saveImage({
      ...data,
      url: Env.NEXT_PUBLIC_S3_BUCKET_URL + file.name,
      category,
      id,
    })
  }

  const imageSrc = useMemo(
    () => file && URL.createObjectURL(file),
    [file?.name]
  )

  return (
    <Fragment>
      <FullPageLoader isLoading={isUploading} />
      <ImagePreview
        onSubmit={onSubmitHandler}
        onDelete={onRemove}
        url={imageSrc}
        defaultValues={{ name: file.name }}
      />
    </Fragment>
  )
}

export default NewImagePreview

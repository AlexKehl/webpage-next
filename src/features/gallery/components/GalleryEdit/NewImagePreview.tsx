import { Category } from '@prisma/client'
import { Fragment, useMemo, useState } from 'react'
import FullPageLoader from 'src/components/FullPageLoader'
import Env from 'src/constants/EnvProxy'
import useI18n from 'src/lib/hooks/useI18n'
import useToasts from 'src/lib/hooks/useToasts'
import { GalleryImage } from 'src/types/PrismaProxy'
import { trpc } from 'src/utils/Trpc'
import ImagePreview from './ImagePreview'

interface Props {
  category: Category
  file: File
  onRemove: () => void
}

const NewImagePreview = ({ category, file, onRemove }: Props) => {
  const { t } = useI18n()
  const utils = trpc.useContext()
  const [isUploading, setIsUploading] = useState(false)
  const { showSuccessToast } = useToasts()

  const { mutate: saveImage } = trpc.galleryImageRouter.save.useMutation({
    onSuccess: () => {
      onRemove()
      utils.galleryImageRouter.imagesList.invalidate()
      showSuccessToast(t.successfullySubmitted)
    },
  })

  const onSubmitHandler = async (
    data: Omit<GalleryImage, 'url' | 'id' | 'category'>
  ) => {
    const { uploadUrl, id } = await utils.client.s3Router.getUploadUrl.query({
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
      url: Env.NEXT_PUBLIC_S3_BUCKET_URL + id,
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

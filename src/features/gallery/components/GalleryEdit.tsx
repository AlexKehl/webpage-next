import { Button, Flex, VStack } from '@chakra-ui/react'
import { GalleryImage } from '@prisma/client'
import { Category } from 'common/interface/Constants'
import { Fragment, useState } from 'react'
import Dropzone from 'react-dropzone'
import { omit } from 'remeda'
import useI18n from 'src/lib/hooks/useI18n'
import { useContext, useMutation, useQuery } from 'src/utils/Trpc'
import { uploadFile } from '../api'
import A from './A'

interface Props {
  category: Category
}

type GalleryImageWithOptionalId = Omit<GalleryImage, 'id'> & { id?: string }

type NewImage = { file: File } & Omit<GalleryImageWithOptionalId, 'url'>

const GalleryEdit = ({ category }: Props) => {
  const { t } = useI18n()
  const { data: images } = useQuery(['gallery.imagesList', { category }])

  const [addedImages, setAddedImages] = useState<NewImage[]>([])

  const allImages = [...(images || []), ...addedImages]

  const { invalidateQueries } = useContext()

  const { mutate: saveImage } = useMutation('gallery.save', {
    onSuccess: () => {
      invalidateQueries(['gallery.imagesList'])
    },
  })

  const { mutate: deleteImage } = useMutation('gallery.delete', {
    onSuccess: () => {
      invalidateQueries(['gallery.imagesList'])
    },
  }) // TODO delete on s3

  const onFileDropHandler = (files: File[]) => {
    const newImages: NewImage[] = files.map((file) => ({
      name: file.name,
      category: category,
      isForSell: false,
      description: null,
      price: null,
      height: '',
      width: '',
      file,
    }))
    setAddedImages(newImages)
  }

  const handleImageSave = async (idx: number) => {
    const image = allImages[idx]
    if (!image) return
    if ('file' in image) {
      const url = await uploadFile(image.file)
      const newImage = { ...omit(image, ['file']), url }
      setAddedImages([
        ...addedImages.slice(0, idx),
        ...addedImages.slice(idx + 1),
      ])
      return saveImage(newImage)
    }
    return saveImage(image)
  }

  const handleImageDelete = async (idx: number) => {
    const image = allImages[idx]
    if (!image) return
    if ('file' in image) {
      return setAddedImages([
        ...addedImages.slice(0, idx),
        ...addedImages.slice(idx + 1),
      ])
    }
    return deleteImage(image)
  }

  return (
    <VStack>
      <Flex wrap="wrap" justifyContent="center">
        {allImages?.map((image, idx) => (
          <A
            key={idx}
            metaData={image}
            url={'url' in image ? image.url : URL.createObjectURL(image.file)}
            onSave={() => handleImageSave(idx)}
            onDelete={() => handleImageDelete(idx)}
          />
        ))}
      </Flex>
      <Dropzone
        accept={{
          'image/png': ['.png', '.jpg'],
        }}
        onDrop={onFileDropHandler}
      >
        {({ getRootProps, getInputProps }) => (
          <Fragment>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button m="2">{t.addFile}</Button>
            </div>
          </Fragment>
        )}
      </Dropzone>
    </VStack>
  )
}

export default GalleryEdit

// {images?.map((image, idx) => {
//   return <GalleryUploadedPreview key={idx} image={image} />
// })}
// {addedFiles?.map((file, idx) => {
//   return (
//     <GalleryUploadPreview
//       key={idx}
//       category={category}
//       file={file}
//       onRemove={() => {
//         setAddedFiles(
//           addedFiles.filter((_, fileIdx) => fileIdx !== idx)
//         )
//       }}
//     />
//   )
// })}

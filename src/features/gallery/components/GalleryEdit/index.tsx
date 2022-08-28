import { Button, Flex, VStack } from '@chakra-ui/react'
import { Category } from '@prisma/client'
import { Fragment, useState } from 'react'
import Dropzone from 'react-dropzone'
import useI18n from 'src/lib/hooks/useI18n'
import { useQuery } from 'src/utils/Trpc'
import ImageFromDbPreview from './ImageFromDbPreview'
import NewImagePreview from './NewImagePreview'

interface Props {
  category: Category
}

const GalleryEdit = ({ category }: Props) => {
  const { t } = useI18n()
  const { data: images } = useQuery(['gallery.imagesList', { category }], {
    refetchOnWindowFocus: false,
  })

  const [addedFiles, setAddedFiles] = useState<File[]>([])

  return (
    <VStack>
      <Flex wrap="wrap" justifyContent="center">
        {images?.map((image, idx) => {
          return <ImageFromDbPreview key={idx} image={image} />
        })}
        {addedFiles?.map((file, idx) => {
          return (
            <NewImagePreview
              key={idx}
              category={category}
              file={file}
              onRemove={() => {
                setAddedFiles(
                  addedFiles.filter((_, fileIdx) => fileIdx !== idx)
                )
              }}
            />
          )
        })}
      </Flex>
      <Dropzone
        accept={{
          'image/png': ['.png', '.jpg'],
        }}
        onDrop={setAddedFiles}
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

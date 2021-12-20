import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Input, Textarea, Flex, Checkbox, Box, Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Category } from '../../../common/interface/Constants'
import { GalleryImageMeta } from '../../../common/interface/GalleryImages'
import useI18n from '../../lib/hooks/useI18n'
import ImagePresenter from '../ImagePresenter'
import InputWithAnnotation from './InputWithAnnotation'
import { FormProvider, useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import {
  useGalleryDeleteMutation,
  useGalleryUploadMutation,
} from '../../redux/services/serverApi'
import useLoader from '../../lib/hooks/useLoader'
import { gallerySelector } from '../../redux/slices/gallerySlice'
import { fileToBase64 } from '../../redux/services/transformers/files'
import { FileWithMeta } from '../../types/GalleryImages'

interface Props {
  fileWithMeta: FileWithMeta
  category: Category
}

const GalleryUploadPreview = ({ fileWithMeta, category }: Props) => {
  const { t } = useI18n()
  const formData = useForm()
  const { file, ...fileMeta } = fileWithMeta

  useEffect(() => {
    formData.reset({
      ...fileMeta,
      name: fileMeta?.name || file.name,
    })
  }, [])

  const [uploadImage] = useGalleryUploadMutation()
  const [deleteImage] = useGalleryDeleteMutation()

  useLoader(gallerySelector)

  const handleSubmit = async (data: GalleryImageMeta) => {
    uploadImage({
      ...data,
      category,
      id: fileMeta?.id || uuid(),
      image: await fileToBase64(file),
    })
  }

  return (
    <form onSubmit={formData.handleSubmit(handleSubmit)}>
      <FormProvider {...formData}>
        <Flex
          border="1px"
          borderColor="gray.400"
          m="2"
          p="2"
          wrap="wrap"
          maxW="3xl"
          backgroundColor="gray.50"
          justifyContent={{ base: 'center', md: 'flex-start' }}
        >
          <ImagePresenter src={URL.createObjectURL(file)} />
          <Box id="imageinfo">
            <Input
              id="name"
              my="1"
              placeholder="Name"
              {...formData.register('name')}
            />
            <Textarea
              id="description"
              my="1"
              placeholder="Description"
              {...formData.register('description')}
            />

            <Flex w="full" wrap="wrap" alignItems="end">
              <InputWithAnnotation
                label={t.width}
                annotation={t.cm}
                hookFormRegister={formData.register('width', {
                  required: true,
                })}
              />
              <InputWithAnnotation
                label={t.height}
                annotation={t.cm}
                hookFormRegister={formData.register('height', {
                  required: true,
                })}
              />

              <Flex id="marketing" className="mx-4" alignItems="end">
                <Checkbox
                  id="isForSell"
                  defaultIsChecked={fileMeta?.isForSell}
                  size="lg"
                  {...formData.register('isForSell')}
                >
                  For sale
                </Checkbox>
                {formData.watch()['isForSell'] && (
                  <InputWithAnnotation
                    label={t.price}
                    annotation={t.euro}
                    hookFormRegister={formData.register('price', {
                      required: formData.watch()['isForSell'],
                    })}
                  />
                )}
              </Flex>
            </Flex>

            <Flex justifyContent="center">
              <Button
                mx="1"
                w="full"
                leftIcon={<CheckIcon />}
                color="green.500"
                aria-label=""
                type="submit"
              >
                {t.save}
              </Button>
              <Button
                mx="1"
                w="full"
                color="red.500"
                aria-label=""
                leftIcon={<CloseIcon />}
                onClick={() => deleteImage({ id: fileMeta!.id!, category })}
              >
                {t.delete}
              </Button>
            </Flex>
          </Box>
        </Flex>
      </FormProvider>
    </form>
  )
}

export default GalleryUploadPreview

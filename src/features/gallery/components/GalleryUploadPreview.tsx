import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Flex, Box, Input, Textarea, Checkbox, Button } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { GalleryImageMeta } from 'common/interface/GalleryImages'
import { Category } from 'common/interface/Constants'
import ImagePresenter from 'src/components/ImagePresenter'
import useI18n from 'src/lib/hooks/useI18n'
import {
  useGalleryUploadMutation,
  useGalleryDeleteMutation,
} from 'src/redux/services/serverApi'
import { fileToBase64 } from 'src/redux/services/transformers/files'
import InputWithAnnotation from './InputWithAnnotation'
import { v4 as uuid } from 'uuid'
import { FileWithMeta } from 'src/features/gallery/types'

interface Props {
  fileWithMeta: FileWithMeta
  category: Category
}

const GalleryUploadPreview = ({ fileWithMeta, category }: Props) => {
  const { t } = useI18n()
  const { file, ...fileMeta } = fileWithMeta

  const formData = useForm({
    defaultValues: {
      ...fileMeta,
      name: fileMeta?.name || file.name,
    },
  })

  const [uploadImage] = useGalleryUploadMutation()
  const [deleteImage] = useGalleryDeleteMutation()
  const imageSrc = useMemo(() => URL.createObjectURL(file), [file.name])

  const onSubmit = async (data: GalleryImageMeta) => {
    uploadImage({
      ...data,
      category,
      id: fileMeta?.id || uuid(),
      image: await fileToBase64(file),
    })
  }

  return (
    <form onSubmit={formData.handleSubmit(onSubmit)}>
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
          <ImagePresenter src={imageSrc} />
          <Box id="imageinfo">
            <Input
              id="name"
              my="1"
              placeholder={t.name}
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

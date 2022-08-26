import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Box, Button, Checkbox, Flex, Input, Textarea } from '@chakra-ui/react'
import { GalleryImage } from '@prisma/client'
import { Category } from 'common/interface/Constants'
import { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import ImagePresenter from 'src/components/ImagePresenter'
import useI18n from 'src/lib/hooks/useI18n'
import { useContext, useMutation } from 'src/utils/Trpc'
import { uploadFile } from '../api'
import InputWithAnnotation from './InputWithAnnotation'

interface Props {
  category: Category
  file: File
  onRemove: () => void
}

const GalleryUploadPreview = ({ category, file, onRemove }: Props) => {
  const { t } = useI18n()
  const { invalidateQueries } = useContext()

  const formData = useForm<Omit<GalleryImage, 'url' | 'id' | 'category'>>()

  const { mutate: saveImage } = useMutation('gallery.save', {
    onSuccess: () => {
      onRemove()
      invalidateQueries(['gallery.imagesList'])
    },
  })

  const imageSrc = useMemo(
    () => file && URL.createObjectURL(file),
    [file?.name]
  )

  const onSubmit = async (
    data: Omit<GalleryImage, 'url' | 'id' | 'category'>
  ) => {
    if (!file) {
      return
    }
    const url = await uploadFile(file)
    saveImage({ ...data, url, category, price: null })
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
                      required: Boolean(formData.watch()['isForSell']),
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
                onClick={() => onRemove()}
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

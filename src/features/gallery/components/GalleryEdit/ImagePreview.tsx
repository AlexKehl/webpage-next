import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Box, Button, Checkbox, Flex, Input, Textarea } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import InputField from 'src/components/Form/InputField'
import ImagePresenter from 'src/components/ImagePresenter'
import useI18n from 'src/lib/hooks/useI18n'
import { GalleryImage } from 'src/types/PrismaProxy'
import InputWithAnnotation from './InputWithAnnotation'

interface Props {
  url: string
  onDelete: () => void
  onSubmit: (data: Omit<GalleryImage, 'url' | 'id' | 'category'>) => void
  isForSell?: GalleryImage['isForSell']
  defaultValues?: Partial<GalleryImage>
}

const ImagePreview = (props: Props) => {
  const { t } = useI18n()

  const formData = useForm<Omit<GalleryImage, 'url' | 'id' | 'category'>>({
    defaultValues: props.defaultValues,
  })
  return (
    <form onSubmit={formData.handleSubmit(props.onSubmit)}>
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
          <ImagePresenter src={props.url} />
          <Box id="imageinfo">
            <InputField
              id="name"
              my="1"
              placeholder={t.name}
              hookFormRegister={formData.register('name', { required: true })}
              errorText={t.fieldRequired}
              error={Boolean(formData.formState.errors['name'])}
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
                  defaultChecked={props.isForSell}
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
                onClick={() => props.onDelete()}
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

export default ImagePreview

import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Input, Textarea, Flex, Checkbox, Box, Button } from '@chakra-ui/react'
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { Category } from '../../../common/interface/Constants'
import { GalleryImageMeta } from '../../../common/interface/GalleryImages'
import { uploadImage, deleteImage } from '../../lib/api/Files'
import useApi from '../../lib/hooks/useApi'
import useI18n from '../../lib/hooks/useI18n'
import { getEventValue } from '../../utils/Functions'
import ImagePresenter from '../ImagePresenter'
import InputWithAnnotation from './InputWithAnnotation'

interface Props {
  onRemoveFile: (fileName: string) => void
  fileMeta?: Partial<GalleryImageMeta>
  file: File
  category: Category
}

const GalleryUploadPreview = ({
  onRemoveFile,
  fileMeta,
  file,
  category,
}: Props) => {
  const { t } = useI18n()
  const { validatedRequest } = useApi()
  const [formData, updateFormData] = useState<Partial<GalleryImageMeta>>({
    isForSell: fileMeta?.isForSell || false,
    width: fileMeta?.width,
    height: fileMeta?.height,
    name: fileMeta?.name || file.name,
    price: fileMeta?.price,
    description: fileMeta?.description,
    category: fileMeta?.category,
  })

  const imageUrl = URL.createObjectURL(file)

  const onPreviewConfirm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    validatedRequest(() =>
      uploadImage({
        file,
        ...formData,
        category,
      })
    )
  }

  const onFormFieldChange: ChangeEventHandler<any> = (e) => {
    updateFormData({
      ...formData,
      [e.target.id]: getEventValue(e),
    })
  }

  const onRemoveFileHandler = async () => {
    await validatedRequest(() =>
      deleteImage(category, fileMeta?.name || file.name)
    )
    onRemoveFile(fileMeta?.name || file.name)
  }

  return (
    <form onSubmit={onPreviewConfirm}>
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
        <ImagePresenter src={imageUrl} />
        <Box id="imageinfo">
          <Input
            id="name"
            my="1"
            placeholder="Name"
            onChange={onFormFieldChange}
            defaultValue={fileMeta?.name || file.name}
          />
          <Textarea
            id="description"
            my="1"
            placeholder="Description"
            onChange={onFormFieldChange}
            defaultValue={fileMeta?.description}
          />

          <Flex w="full" wrap="wrap" alignItems="end">
            <InputWithAnnotation
              id="width"
              defaultValue={fileMeta?.width}
              onChange={onFormFieldChange}
              label={t.width}
              annotation={t.cm}
            />
            <InputWithAnnotation
              id="height"
              defaultValue={fileMeta?.height}
              onChange={onFormFieldChange}
              label={t.height}
              annotation={t.cm}
            />

            <Flex id="marketing" className="mx-4" alignItems="end">
              <Checkbox
                id="isForSell"
                defaultIsChecked={fileMeta?.isForSell}
                size="lg"
                onChange={onFormFieldChange}
              >
                For sale
              </Checkbox>
              {formData?.isForSell && (
                <InputWithAnnotation
                  id="price"
                  defaultValue={fileMeta?.price}
                  onChange={onFormFieldChange}
                  label={t.price}
                  annotation={t.euro}
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
              onClick={() => onRemoveFileHandler()}
            >
              {t.delete}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </form>
  )
}

export default GalleryUploadPreview

import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  FormControl,
  Input,
  Text,
  Textarea,
  FormLabel,
  Flex,
  Checkbox,
  IconButton,
} from '@chakra-ui/react'
import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useState,
} from 'react'
import { Category } from '../../common/interface/Constants'
import { GalleryImageMeta } from '../../common/interface/GalleryImages'
import ImagePresenter from './ImagePresenter'
import { deleteImage, uploadImage } from '../lib/api/Files'
import useApi from '../lib/hooks/useApi'
import { getEventValue } from '../utils/Functions'
import { joinClasses } from '../utils/TailWind'

interface Props {
  onRemoveFile: (fileName: string) => void
  fileMeta?: Partial<GalleryImageMeta>
  file: File
  category: Category
}

const GalleryUploadPreview: FC<Props> = ({
  onRemoveFile,
  fileMeta,
  file,
  category,
}) => {
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
    <form
      className={joinClasses(['w-full', 'bg-gray-50'])}
      onSubmit={onPreviewConfirm}
    >
      <FormControl className="flex">
        <ImagePresenter image={{ url: imageUrl }} />
        <div id="imageinfo" className="w-1/2">
          <Input
            id="name"
            className="my-1"
            placeholder="Name"
            onChange={onFormFieldChange}
            defaultValue={fileMeta?.name || file.name}
          />
          <Textarea
            id="description"
            className="my-1"
            placeholder="Description"
            onChange={onFormFieldChange}
            defaultValue={fileMeta?.description}
          />

          <div className="flex w-full">
            <div id="width-block" className="mx-4">
              <FormLabel>Width</FormLabel>
              <Flex>
                <Input
                  id="width"
                  width={16}
                  type="number"
                  defaultValue={fileMeta?.width}
                  onChange={onFormFieldChange}
                  className="m-1"
                />
                <Text className="self-end" fontSize="md">
                  cm
                </Text>
              </Flex>
            </div>
            <div id="height-block" className="mx-4">
              <FormLabel>Height</FormLabel>
              <span className="flex">
                <Input
                  id="height"
                  type="number"
                  width={16}
                  onChange={onFormFieldChange}
                  defaultValue={fileMeta?.height}
                  className="m-1"
                />
                <Text className="self-end" fontSize="md">
                  cm
                </Text>
              </span>
            </div>

            <Flex id="marketing" className="mx-4">
              <Checkbox
                id="isForSell"
                className="my-2 mr-2"
                defaultIsChecked={fileMeta?.isForSell}
                size="lg"
                onChange={onFormFieldChange}
              >
                For sale
              </Checkbox>
              {formData?.isForSell && (
                <div id="price-block">
                  <FormLabel>Price</FormLabel>
                  <div className="flex">
                    <Input
                      id="price"
                      width={20}
                      type="number"
                      onChange={onFormFieldChange}
                      defaultValue={fileMeta?.price}
                      className="m-1"
                    />
                    <Text className="self-end" fontSize="md">
                      Euro
                    </Text>
                  </div>
                </div>
              )}
            </Flex>
          </div>

          <Flex id="controlbuttons">
            <IconButton
              className="mx-1"
              color="green.500"
              aria-label=""
              icon={<CheckIcon />}
              type="submit"
            />
            <IconButton
              className="mx-1"
              color="red.500"
              aria-label=""
              icon={<CloseIcon />}
              onClick={() => onRemoveFileHandler()}
            />
          </Flex>
        </div>
      </FormControl>
    </form>
  )
}

export default GalleryUploadPreview

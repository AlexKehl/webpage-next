import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react'
import React, { ChangeEventHandler, FC, FormEventHandler } from 'react'
import { GalleryImageMeta } from '../../../common/interface/GalleryImages'
import ImagePresenter from '../../src/components/ImagePresenter'
import { joinClasses } from '../../src/utils/TailWind'

interface Props {
  onPreviewConfirm: FormEventHandler<HTMLFormElement>
  onRemoveFile: (fileName: string) => void
  imageUrl: string
  onFormFieldChange: ChangeEventHandler<any>
  galleryImageMeta: GalleryImageMeta
}

const FileUploadPreviewView: FC<Props> = ({
  onPreviewConfirm,
  onRemoveFile,
  imageUrl,
  onFormFieldChange,
  galleryImageMeta,
}) => {
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
            defaultValue={galleryImageMeta.name}
          />
          <Textarea
            id="description"
            className="my-1"
            placeholder="Description"
            onChange={onFormFieldChange}
            defaultValue={galleryImageMeta.description}
          />

          <div className="flex w-full">
            <div id="width-block" className="mx-4">
              <FormLabel>Width</FormLabel>
              <Flex>
                <Input
                  id="width"
                  width={16}
                  defaultValue={galleryImageMeta.size.width}
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
                  width={16}
                  onChange={onFormFieldChange}
                  defaultValue={galleryImageMeta.size.height}
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
                defaultIsChecked={galleryImageMeta.isForSell}
                size="lg"
                onChange={onFormFieldChange}
              >
                For sale
              </Checkbox>
              {galleryImageMeta.isForSell && (
                <div id="price-block">
                  <FormLabel>Price</FormLabel>
                  <div className="flex">
                    <Input
                      id="price"
                      width={20}
                      onChange={onFormFieldChange}
                      defaultValue={galleryImageMeta.price}
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
              onClick={() => onRemoveFile(galleryImageMeta.name)}
            />
          </Flex>
        </div>
      </FormControl>
    </form>
  )
}

export default FileUploadPreviewView

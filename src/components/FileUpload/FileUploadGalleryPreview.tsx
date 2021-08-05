import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Checkbox,
  FormControl,
  IconButton,
  Input,
  Textarea,
  Text,
  FormLabel,
  Flex,
} from '@chakra-ui/react'
import React, { FC, FormEventHandler, useState } from 'react'
import { IPreviewProps } from 'react-dropzone-uploader'
import { useForm } from 'react-hook-form'
import { Category, FileToUpload } from '../../types'
import ImagePresenter from '../ImagePresenter'
import { isEmpty } from 'lodash'
import { joinClasses } from '../../utils/TailWind'

interface Props extends IPreviewProps {
  category: Category
  onSubmit: (file: FileToUpload) => void
}

const FileUploadPreview: FC<Props> = ({ onSubmit, fileWithMeta }) => {
  const [isForSell, setIsForSell] = useState(false)
  const { register, handleSubmit, formState } = useForm()
  const { errors } = formState
  const url = URL.createObjectURL(fileWithMeta.file)

  const isValidated = isEmpty(formState.errors)

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (val: any) => {
    const generatedFile: FileToUpload = {
      file: fileWithMeta.file,
      name: val.name,
      isForSell: val.isForSell,
      size: {
        width: val.width,
        height: val.height,
      },
      price: val.price,
      description: val.description,
    }
    onSubmit(generatedFile)
  }

  return (
    <form
      className={joinClasses([
        'w-full',
        isValidated ? 'bg-green-50' : 'bg-red-50',
      ])}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <FormControl className="flex">
        <ImagePresenter url={url} />
        <div id="imageinfo" className="w-1/2">
          <Input
            id="name"
            className="my-1"
            placeholder="Name"
            defaultValue={fileWithMeta.meta.name}
            isInvalid={errors.name}
            {...register('name', {
              required: true,
              pattern: /.+\.(jpg|png|jpeg)$/,
            })}
          />
          <Textarea
            className="my-1"
            placeholder="Description"
            {...register('description')}
          />

          <div className="flex w-full">
            <div id="width-block" className="mx-4">
              <FormLabel>Width</FormLabel>
              <Flex>
                <Input
                  id="width"
                  width={16}
                  className="m-1"
                  isInvalid={errors.width}
                  {...register('width', { required: true })}
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
                  className="m-1"
                  isInvalid={errors.height}
                  {...register('height', { required: true })}
                />
                <Text className="self-end" fontSize="md">
                  cm
                </Text>
              </span>
            </div>

            <Flex id="marketing" className="mx-4">
              <Checkbox
                className="my-2 mr-2"
                size="lg"
                {...register('isForSell')}
                onChange={(e) => setIsForSell(e.target.checked)}
              >
                For sale
              </Checkbox>
              {isForSell && (
                <div id="price-block">
                  <FormLabel>Price</FormLabel>
                  <div className="flex">
                    <Input
                      id="price"
                      width={20}
                      className="m-1"
                      isInvalid={isForSell && errors.price}
                      {...register('price', { required: isForSell })}
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
              onClick={() => fileWithMeta.remove()}
            />
          </Flex>
        </div>
      </FormControl>
    </form>
  )
}

export default FileUploadPreview

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
import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FileToUpload } from '../../src/types'
import ImagePresenter from '../../src/components/ImagePresenter'
import { isEmpty } from 'lodash'
import { joinClasses } from '../../src/utils/TailWind'

interface Props extends Partial<FileToUpload> {
  onSubmit: (file: FileToUpload) => void
  deleteFile: (fileName: string) => void
}

interface HookFormValidationData {
  name: string
  description?: string
  isForSell: boolean
  price?: number
  width: number
  height: number
}

const FileUploadPreview: FC<Props> = ({
  onSubmit,
  file,
  deleteFile,
  size,
  price,
  isForSell = false,
  description,
}) => {
  const [isForSellChecked, setIsForSellChecked] = useState(isForSell)
  const { register, handleSubmit, formState, trigger } = useForm()
  const { errors } = formState
  const url = URL.createObjectURL(file)

  const isValidated = isEmpty(formState.errors)

  useEffect(() => {
    trigger()
  }, [])

  const onSubmitHandler = (val: HookFormValidationData) => {
    const generatedFile: FileToUpload = {
      file: file,
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
        <ImagePresenter image={{ url }} />
        <div id="imageinfo" className="w-1/2">
          <Input
            id="name"
            className="my-1"
            placeholder="Name"
            defaultValue={file.name}
            isInvalid={errors.name}
            {...register('name', {
              required: true,
              pattern: /.+\.(jpg|png|jpeg)$/,
            })}
          />
          <Textarea
            className="my-1"
            placeholder="Description"
            defaultValue={description}
            {...register('description')}
          />

          <div className="flex w-full">
            <div id="width-block" className="mx-4">
              <FormLabel>Width</FormLabel>
              <Flex>
                <Input
                  id="width"
                  width={16}
                  defaultValue={size?.width}
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
                  defaultValue={size?.height}
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
                defaultIsChecked={isForSell}
                size="lg"
                {...register('isForSell')}
                onChange={(e) => setIsForSellChecked(e.target.checked)}
              >
                For sale
              </Checkbox>
              {isForSellChecked && (
                <div id="price-block">
                  <FormLabel>Price</FormLabel>
                  <div className="flex">
                    <Input
                      id="price"
                      width={20}
                      defaultValue={price}
                      className="m-1"
                      isInvalid={isForSellChecked && errors.price}
                      {...register('price', { required: isForSellChecked })}
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
              onClick={() => deleteFile(file.name)}
            />
          </Flex>
        </div>
      </FormControl>
    </form>
  )
}

export default FileUploadPreview

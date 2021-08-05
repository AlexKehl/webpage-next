import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Checkbox,
  FormControl,
  IconButton,
  Input,
  Textarea,
  Text,
  FormLabel,
} from '@chakra-ui/react'
import React, { FC, FormEventHandler, useState } from 'react'
import { IPreviewProps } from 'react-dropzone-uploader'
import { useForm } from 'react-hook-form'
import { Category } from '../../types'
import ImagePresenter from '../ImagePresenter'

interface Props extends IPreviewProps {
  category: Category
  onSubmit: FormEventHandler<HTMLFormElement>
}

const FileUploadPreview: FC<Props> = ({ onSubmit, fileWithMeta }) => {
  const [isForSell, setIsForSell] = useState(false)
  const { register, handleSubmit, formState } = useForm()
  const { errors } = formState
  const url = URL.createObjectURL(fileWithMeta.file)

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <FormControl className="flex">
        <ImagePresenter url={url} />
        <div id="imageinfo" className="w-1/2">
          <Input
            id="name"
            className="my-1"
            placeholder="name"
            defaultValue={fileWithMeta.meta.name}
            isInvalid={errors.name}
            {...register('name', {
              required: 'This is required',
            })}
          />
          <Textarea className="my-1" placeholder="Description" />

          <div className="flex w-full">
            <div id="width-block" className="mx-4">
              <FormLabel>Width</FormLabel>
              <span className="flex">
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
              </span>
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

            <div id="marketing" className="flex mx-4">
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
            </div>
          </div>

          <div id="controlbuttons" className="flex">
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
          </div>
        </div>
      </FormControl>
    </form>
  )
}

export default FileUploadPreview

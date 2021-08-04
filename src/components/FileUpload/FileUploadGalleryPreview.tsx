import { CloseIcon } from '@chakra-ui/icons'
import { IconButton, Select } from '@chakra-ui/react'
import React, { FC } from 'react'
import { IPreviewProps } from 'react-dropzone-uploader'
import Categories from '../../constants/Categories'
import { Category } from '../../types'
import ImagePresenter from '../ImagePresenter'

interface Props extends IPreviewProps {
  category: Category
}

const FileUploadPreview: FC<Props> = ({ fileWithMeta, category }) => {
  const url = URL.createObjectURL(fileWithMeta.file)
  return (
    <div className="flex w-full">
      <ImagePresenter url={url} />
      <div className="w-1/2">
        <h1>{fileWithMeta.meta.name}</h1>
        <Select placeholder="Select option">
          {Categories.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </Select>
        <IconButton
          aria-label="Search database"
          icon={<CloseIcon />}
          onClick={() => fileWithMeta.remove()}
        />
      </div>
    </div>
  )
}

export default FileUploadPreview

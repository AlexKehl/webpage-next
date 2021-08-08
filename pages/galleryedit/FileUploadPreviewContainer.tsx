import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useState,
} from 'react'
import { FileToUpload } from '../../src/types'
import FileUploadGalleryPreviewView from './FileUploadPreviewView'
import { PreviewFormData } from './types'

interface Props extends Partial<FileToUpload> {
  onSubmit: (file: FileToUpload) => void
  onDelete: (fileName: string) => void
}

const FileUploadPreviewContainer: FC<Props> = ({
  onSubmit,
  file,
  onDelete,
  size,
  price,
  isForSell = false,
  description,
  name,
}) => {
  const [formData, updateFormData] = useState<PreviewFormData>({
    isForSell,
    width: size.width,
    height: size.height,
    name: name,
    price,
    description,
  })

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const generatedFile: FileToUpload = {
      file: file,
      ...formData,
      size: {
        width: formData.width,
        height: formData.height,
      },
    }
    onSubmit(generatedFile)
  }

  const onFormFieldChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateFormData({
      ...formData,
      [e.target.id]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    })
  }

  return (
    <FileUploadGalleryPreviewView
      formData={formData}
      onFormFieldChange={onFormFieldChange}
      onSubmit={onSubmitHandler}
      imageUrl={URL.createObjectURL(file)}
      onDelete={onDelete}
    />
  )
}

export default FileUploadPreviewContainer

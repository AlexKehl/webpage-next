import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useState,
} from 'react'
import { FileToUpload } from '../../src/types'
import FileUploadGalleryPreviewView from './GalleryUploadPreviewView'
import { PreviewFormData } from './types'

interface Props extends Partial<FileToUpload> {
  onPreviewConfirm: (file: FileToUpload) => void
  onDelete: (fileName: string) => void
}

const FileUploadPreviewContainer: FC<Props> = ({
  onPreviewConfirm,
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
    width: size?.width,
    height: size?.height,
    name: name,
    price,
    description,
  })

  const onPreviewConfirmHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const generatedFile: FileToUpload = {
      file: file,
      ...formData,
      size: {
        width: formData.width,
        height: formData.height,
      },
    }
    onPreviewConfirm(generatedFile)
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
      onPreviewConfirm={onPreviewConfirmHandler}
      imageUrl={URL.createObjectURL(file)}
      onDelete={onDelete}
    />
  )
}

export default FileUploadPreviewContainer

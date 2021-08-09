import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useState,
} from 'react'
import { deleteImage, uploadImage } from '../../src/lib/api/Files'
import useApi from '../../src/lib/hooks/useApi'
import { FileToUpload, FileWithMeta } from '../../src/types'
import FileUploadGalleryPreviewView from './GalleryUploadPreviewView'
import { PreviewFormData } from './types'

interface Props {
  onRemoveFile: (fileName: string) => void
  file: FileWithMeta
}

const FileUploadPreviewContainer: FC<Props> = ({ onRemoveFile, file }) => {
  const { validatedRequest } = useApi()
  const [formData, updateFormData] = useState<PreviewFormData>({
    isForSell: file.isForSell,
    width: file.size?.width,
    height: file.size?.height,
    name: file.name || file.file.name,
    price: file.price,
    description: file.description,
  })

  const onPreviewConfirm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const generatedFile: FileToUpload = {
      file: file.file,
      ...formData,
      size: {
        width: formData.width,
        height: formData.height,
      },
    }
    validatedRequest(() => uploadImage(file.category)(generatedFile))
  }

  const onFormFieldChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateFormData({
      ...formData,
      [e.target.id]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    })
  }

  const onRemoveFileAndForward = async (name: string) => {
    await validatedRequest(() => deleteImage(file.category, name))
    onRemoveFile(name)
  }

  return (
    <FileUploadGalleryPreviewView
      formData={formData}
      onFormFieldChange={onFormFieldChange}
      onPreviewConfirm={onPreviewConfirm}
      imageUrl={URL.createObjectURL(file?.file || file)}
      onRemoveFile={onRemoveFileAndForward}
    />
  )
}

export default FileUploadPreviewContainer

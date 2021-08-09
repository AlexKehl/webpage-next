import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useState,
} from 'react'
import { GalleryImageMeta } from '../../common/interface/GalleryImages'
import { deleteImage, uploadImage } from '../../src/lib/api/Files'
import useApi from '../../src/lib/hooks/useApi'
import { FileWithMeta } from '../../src/types/GalleryImages'
import FileUploadGalleryPreviewView from './GalleryUploadPreviewView'

interface Props {
  onRemoveFile: (fileName: string) => void
  fileWithMeta: FileWithMeta
}

const FileUploadPreviewContainer: FC<Props> = ({
  onRemoveFile,
  fileWithMeta,
}) => {
  const { file, ...fileMeta } = fileWithMeta

  const { validatedRequest } = useApi()
  const [formData, updateFormData] = useState<GalleryImageMeta>({
    isForSell: fileWithMeta.isForSell,
    size: fileWithMeta.size,
    name: fileWithMeta.name || fileWithMeta.file.name,
    price: fileWithMeta.price,
    description: fileWithMeta.description,
    category: fileWithMeta.category,
  })

  const onPreviewConfirm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    validatedRequest(() => uploadImage(fileWithMeta))
  }

  const onFormFieldChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateFormData({
      ...formData,
      [e.target.id]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    })
  }

  const onRemoveFileAndForward = async () => {
    await validatedRequest(() =>
      deleteImage(fileWithMeta.category, fileWithMeta.name)
    )
    onRemoveFile(fileWithMeta.name)
  }

  return (
    <FileUploadGalleryPreviewView
      galleryImageMeta={fileMeta}
      onFormFieldChange={onFormFieldChange}
      onPreviewConfirm={onPreviewConfirm}
      imageUrl={URL.createObjectURL(fileWithMeta.file)}
      onRemoveFile={onRemoveFileAndForward}
    />
  )
}

export default FileUploadPreviewContainer

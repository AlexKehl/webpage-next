import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useState,
} from 'react'
import { Category } from '../../common/interface/Constants'
import { GalleryImageMeta } from '../../common/interface/GalleryImages'
import { deleteImage, uploadImage } from '../../src/lib/api/Files'
import useApi from '../../src/lib/hooks/useApi'
import { getEventValue } from '../../src/utils/Functions'
import GalleryUploadPreviewView from './GalleryUploadPreviewView'

interface Props {
  onRemoveFile: (fileName: string) => void
  fileMeta?: Partial<GalleryImageMeta>
  file: File
  category: Category
}

const GalleryUploadPreviewContainer: FC<Props> = ({
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

  const onFormFieldChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateFormData({
      ...formData,
      [e.target.id]: getEventValue(e),
    })
  }

  const onRemoveFileAndForward = async () => {
    await validatedRequest(() =>
      deleteImage(category, fileMeta?.name || file.name)
    )
    onRemoveFile(fileMeta?.name || file.name)
  }

  return (
    <GalleryUploadPreviewView
      galleryImageMeta={fileMeta || {}}
      onFormFieldChange={onFormFieldChange}
      onPreviewConfirm={onPreviewConfirm}
      file={file}
      onRemoveFile={onRemoveFileAndForward}
    />
  )
}

export default GalleryUploadPreviewContainer

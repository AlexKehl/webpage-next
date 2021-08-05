// @refresh reset
import React, { FC, Reducer, useEffect, useReducer, useState } from 'react'
import Dropzone, { IFileWithMeta, StatusValue } from 'react-dropzone-uploader'
import { getInitialGalleryFiles } from '../../lib/api/Files'
import { Category, FileMeta, FileWithMeta } from '../../types'
import FileUploadPreview from './FileUploadGalleryPreview'
import { omit } from 'lodash/fp'

interface Props {
  category: Category
  onSubmit: (files?: FileWithMeta[]) => void
}

interface State {
  [x: string]: FileMeta
}

interface Action {
  payload?: {
    key: string
    meta: FileMeta
  }
  type: 'UPDATE_FILE_META' | 'DELETE_FILE_META'
}

const fileMetaReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FILE_META':
      return {
        ...state,
        [action.payload.key]: action.payload.meta,
      }
    case 'DELETE_FILE_META':
      return {
        ...omit([action.payload.key], state),
      }
    default:
      throw new Error('unknown Action')
  }
}

const FileUpload: FC<Props> = ({ category, onSubmit }) => {
  const [libFiles, setLibFiles] = useState<IFileWithMeta[]>()
  const [filesWithMeta, setFilesWithMeta] = useState<FileWithMeta[]>([])
  const [state, dispatch] = useReducer(fileMetaReducer, {})

  useEffect(() => {
    getInitialGalleryFiles(category).then(setFilesWithMeta)
  }, [])
  const onChangeStatus = (
    file: IFileWithMeta,
    status: StatusValue,
    allFiles: IFileWithMeta[]
  ) => {
    setLibFiles(allFiles)
  }

  const prepareSubmit = (): FileWithMeta[] => {
    return libFiles.map((libFile) => {
      return {
        file: libFile.file,
        ...state[libFile.meta.name],
      }
    })
  }

  const onFileFormSubmit = (data) => {
    console.log(data)
  }

  return (
    <Dropzone
      onSubmit={() => onSubmit(prepareSubmit())}
      accept="image/*"
      onChangeStatus={onChangeStatus}
      initialFiles={filesWithMeta?.map((fileWithMeta) => fileWithMeta.file)}
      PreviewComponent={(props) => (
        <FileUploadPreview
          {...props}
          category={category}
          onSubmit={onFileFormSubmit}
        />
      )}
    />
  )
}

export default FileUpload

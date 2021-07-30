import React, { FC } from 'react'
import Dropzone from 'react-dropzone-uploader'

interface Props {
  // onSubmit: ()
}

const FileUpload: FC<Props> = ({}) => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: 'https://httpbin.org/post' }
  }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file)
  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files)
    console.log(allFiles)
    // console.log(files.map((f) => f.meta))
    // allFiles.forEach((f) => f.remove())
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*"
    />
  )
}

export default FileUpload
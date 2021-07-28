import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import submitFiles from './FileSubmit'
import FilePreview from './FilePreview'

const MyUploader = () => {
  const handleSubmit = async (dropZoneFiles) => {
    const files = dropZoneFiles.map((file) => file.file)
    await submitFiles(files)
  }

  return (
    <Dropzone
      onSubmit={handleSubmit}
      accept="image/*"
      // PreviewComponent={FilePreview}
    />
  )
}

export default MyUploader

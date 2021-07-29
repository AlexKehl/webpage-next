import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const MyUploader = () => {
  const handleSubmit = async (dropZoneFiles) => {
    const files = dropZoneFiles.map((file) => file.file)
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

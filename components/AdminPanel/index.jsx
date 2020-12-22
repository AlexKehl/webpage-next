import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import submitFiles from './FileSubmit'

const MyUploader = () => {
  const handleSubmit = async (dropZoneFiles) => {
    const files = dropZoneFiles.map((file) => file.file)
    await submitFiles(files)
  }

  return <Dropzone onSubmit={handleSubmit} accept="image/*" />
}

export default MyUploader

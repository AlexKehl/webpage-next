import CategorySelect from '../../CategorySelect'
import TextField from '@material-ui/core/TextField'

const FilePreview = ({ meta, onPreviewDataChange }) => {
  const onDataChange = (type) => (event) => {
    onPreviewDataChange({ type, value: event.target.value })
  }
  console.log(meta)

  return (
    <div>
      <img
        style={{
          width: '100px',
        }}
        src={meta.previewUrl}
      />
      <TextField value={meta.name} id="name" label="Name" />
      <TextField id="description" label="Description" />

      <CategorySelect />
    </div>
  )
}

export default FilePreview

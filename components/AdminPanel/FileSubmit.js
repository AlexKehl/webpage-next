import axios from 'axios'

const submitFile = async ({ file, fileMeta }) => {
  const URL = `${process.env.SERVER_URL}/fileupload`

  const data = new FormData()

  data.append('fileMeta', 'image')
  data.append('image', file)

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }

  try {
    const res = await axios.post(URL, data, config)
    console.log('response', res)
  } catch (e) {
    console.log('error', e)
  }
}

const submitFiles = async (files) => {
  return await Promise.all(files.map(submitFile))
}

export default submitFiles

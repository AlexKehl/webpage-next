import axios from 'axios'

const fetcher = async (options) => {
  try {
    const { data } = await axios(options)
    return data
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message }
    }
    throw error
  }
}

export default fetcher

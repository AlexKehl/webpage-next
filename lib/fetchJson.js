import axios from 'axios'

export default async function fetcher(options) {
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

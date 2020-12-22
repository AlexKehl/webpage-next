import axios from 'axios'

const hasValidCredentials = async credentials => {
  try {
    await axios.post(`${process.env.SERVER_URL}/login`, credentials, {
      withCredentials: true,
    })
    return true
  } catch (e) {
    return false
  }
}

export { hasValidCredentials }

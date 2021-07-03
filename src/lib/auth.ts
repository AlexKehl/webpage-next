import axios from 'axios'

const hasValidCredentials = async (credentials) => {
  try {
    await axios.post(`/api/sessions`, credentials, {
      withCredentials: true,
    })
    return true
  } catch (e) {
    return false
  }
}

export { hasValidCredentials }

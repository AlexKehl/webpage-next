import axios from 'axios'
import { Credentials } from 'types/'

const hasValidCredentials = async (credentials: Credentials) => {
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

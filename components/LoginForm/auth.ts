import axios from 'axios'
import { Credentials } from 'types/'

const BASE_URL = 'http://127.0.0.1:3001'

const hasValidCredentials = async (credentials: Credentials) => {
  try {
    await axios.post(`${BASE_URL}/login`, credentials)
    return true
  } catch (e) {
    return false
  }
}

export { hasValidCredentials }

import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:3001'

export const performLogin = (history) => async (credentials) => {
  await axios.post(`${BASE_URL}/login`, credentials)
  history.push('/')
}

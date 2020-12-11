import { hasValidCredentials } from 'components/LoginForm/auth'
import axios from 'axios'

jest.mock('axios')

const mockedAxiosPost = axios.post as jest.Mock

describe('hasValidCredentials', () => {
  it('calls axios post to login server route with credentials', async () => {
    mockedAxiosPost.mockResolvedValue('foo')
    const input = { login: 'foo', password: 'bar' }

    const res = await hasValidCredentials(input)

    expect(res).toBe(true)
  })

  it('returns false if credentials are not valid', async () => {
    mockedAxiosPost.mockRejectedValue('foo')
    const input = { login: 'foo', password: 'bar' }

    const res = await hasValidCredentials(input)

    expect(res).toBe(false)
  })
})

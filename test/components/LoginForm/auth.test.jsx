import { hasValidCredentials } from '../../../components/LoginForm/auth'
import axios from 'axios'

jest.mock('axios')

describe('hasValidCredentials', () => {
  it('calls axios post to login server route with credentials', async () => {
    axios.post.mockResolvedValue('foo')
    const input = { login: 'foo', password: 'bar' }

    const res = await hasValidCredentials(input)

    expect(res).toBe(true)
  })

  it('returns false if credentials are not valid', async () => {
    axios.post.mockRejectedValue('foo')
    const input = { login: 'foo', password: 'bar' }

    const res = await hasValidCredentials(input)

    expect(res).toBe(false)
  })
})

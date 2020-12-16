import { useForm } from 'components/LoginForm/useForm'
import { renderHook, act } from '@testing-library/react-hooks'
import axios from 'axios'

jest.mock('axios')

const mockedAxiosPost = axios.post as jest.Mock

const routerMock = {
  push: jest.fn(),
}
const useRouterMock = () => routerMock

beforeEach(() => {
  jest.clearAllMocks()
})

describe('useForm', () => {
  test('it navigates to home on existing credentials', async () => {
    mockedAxiosPost.mockResolvedValue('foo')
    const { result, waitForNextUpdate } = renderHook(() =>
      useForm(useRouterMock),
    )

    act(() => {
      result.current.handleSubmit({ login: 'foo', password: 'bar' })
    })

    await waitForNextUpdate()

    expect(routerMock.push).toHaveBeenCalled()
    expect(routerMock.push).toHaveBeenCalledWith('/')
    expect(result.current.hasFalseCredentials).toBe(false)
  })

  test('It sets hasFalseCredentials to true if credentials are invalid', async () => {
    mockedAxiosPost.mockRejectedValue('foo')
    const { result, waitForNextUpdate } = renderHook(() =>
      useForm(useRouterMock),
    )

    act(() => {
      result.current.handleSubmit({ login: 'foo', password: 'bar' })
    })

    await waitForNextUpdate()

    expect(routerMock.push).not.toHaveBeenCalled()
    expect(result.current.hasFalseCredentials).toBe(true)
  })
})

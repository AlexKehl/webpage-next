import React from 'react'
import LoginForm from '../../../components/LoginForm'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { renderHook, act } from '@testing-library/react-hooks'

const useFormReturnObj = {
  register: jest.fn(),
  errors: {},
  handleSubmit: jest.fn(),
}

const hasValidCredentials = jest.fn()

const useForm = () => useFormReturnObj

beforeEach(() => {
  jest.clearAllMocks()
})

describe('SignIn', () => {
  it('calls handleSubmit fn on submit btn click', () => {
    console.error = jest.fn()
    const { getByTestId } = render(<LoginForm useForm={useForm} />)
    fireEvent.click(getByTestId('signInButton'))
    expect(useFormReturnObj.handleSubmit).toHaveBeenCalled()
  })

  it('calls register 2 times for each input field', () => {
    render(<LoginForm useForm={useForm} />)
    expect(useFormReturnObj.register).toHaveBeenCalledTimes(2)
  })

  it('calls register with required true and email regex pattern', () => {
    render(<LoginForm useForm={useForm} />)
    expect(useFormReturnObj.register).toHaveBeenCalledWith({
      required: true,
      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    })
  })

  it('calls register with required true and minLength for password', () => {
    render(<LoginForm useForm={useForm} />)
    expect(useFormReturnObj.register).toHaveBeenCalledWith({
      required: true,
      minLength: expect.any(Number),
    })
  })

  it('shows an error text if email has wrong format', async () => {
    console.error = jest.fn()
    const { getByTestId, getByText } = render(
      <LoginForm hasValidCredentials={jest.fn()} />
    )
    fireEvent.change(getByTestId('emailInput'), { target: { value: 'foo' } })
    fireEvent.click(getByTestId('signInButton'))

    await waitFor(() => expect(getByText('Invalid email Format')).toBeDefined())
  })

  it('shows an error text if password has wrong format', async () => {
    console.error = jest.fn()
    const { getByTestId, getByText } = render(
      <LoginForm hasValidCredentials={jest.fn()} />
    )
    fireEvent.change(getByTestId('passwordInput'), { target: { value: '42' } })
    fireEvent.click(getByTestId('signInButton'))

    await waitFor(() =>
      expect(getByText('Password length must be greater than 8')).toBeDefined()
    )
  })

  // it('calls hasValidCredentials with data from input fields', async () => {
  //   console.error = jest.fn()
  //   const { getByTestId, getByText } = render(
  //     <LoginForm hasValidCredentials={hasValidCredentials} />,
  //   )
  //
  //   fireEvent.change(getByTestId('passwordInput'), {
  //     target: { value: 'somePassword' },
  //   })
  //   fireEvent.change(getByTestId('emailInput'), {
  //     target: { value: 'test@test.com' },
  //   })
  //   fireEvent.click(getByTestId('signInButton'))
  //
  //   screen.debug()
  //
  //   console.log(getByTestId('passwordInput').value)
  //
  //   expect(hasValidCredentials).toHaveBeenCalledWith({
  //     email: 'test@test.com',
  //     password: 'somePassword',
  //   })
  // })
})

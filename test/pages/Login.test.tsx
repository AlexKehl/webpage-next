import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Endpoints } from '../../common/constants/Endpoints'
import HttpStatus from '../../common/constants/HttpStatus'
import { UserWithPassword } from '../../common/fixtures/User'
import Login from '../../src/components/Login'
import { Texts } from '../../src/constants/Texts'
import { mockRoute, setupMswServer } from '../utils/Msw'

setupMswServer()

it('should show error if email input is not an email', async () => {
  render(<Login />)

  userEvent.type(screen.getByPlaceholderText(Texts.email), 'fooBar')

  userEvent.click(screen.getByRole('button', { name: Texts.login }))

  await waitFor(() => {
    expect(screen.getByText(Texts.emailRuleFail)).toBeInTheDocument()
  })
})

it('should show error if email input is empty', async () => {
  render(<Login />)

  userEvent.click(screen.getByRole('button', { name: Texts.login }))

  await waitFor(() => {
    expect(screen.getByText(Texts.emailRuleFail)).toBeInTheDocument()
  })
})

it('should show error if password is empty', async () => {
  render(<Login />)

  userEvent.click(screen.getByRole('button', { name: Texts.login }))

  await waitFor(() => {
    expect(screen.getByText(Texts.passwordRuleFail)).toBeInTheDocument()
  })
})

it('should show error if password is incorrect', async () => {
  render(<Login />)

  userEvent.type(screen.getByPlaceholderText(Texts.password), 'fooBar')

  userEvent.click(screen.getByRole('button', { name: Texts.login }))

  await waitFor(() => {
    expect(screen.getByText(Texts.passwordRuleFail)).toBeInTheDocument()
  })
})

it('shows wrong credentials error', async () => {
  const { email, password } = UserWithPassword

  mockRoute({
    route: Endpoints.login,
    method: 'post',
    httpStatus: HttpStatus.UNAUTHORIZED,
  })

  render(<Login />)

  userEvent.type(screen.getByPlaceholderText(Texts.email), email)
  userEvent.type(screen.getByPlaceholderText(Texts.password), password)

  userEvent.click(screen.getByRole('button', { name: Texts.login }))

  await waitFor(() => {
    expect(screen.getByText(Texts.wrongCredentials)).toBeInTheDocument()
  })
})

it('shows generic error if error is unknown', async () => {
  const { email, password } = UserWithPassword

  mockRoute({
    route: Endpoints.login,
    method: 'post',
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
  })

  render(<Login />)

  userEvent.type(screen.getByPlaceholderText(Texts.email), email)
  userEvent.type(screen.getByPlaceholderText(Texts.password), password)

  userEvent.click(screen.getByRole('button', { name: Texts.login }))

  await waitFor(() => {
    expect(screen.getByText(Texts.unexpectedError)).toBeInTheDocument()
  })
})

it('shows success text on successfull login', async () => {
  const { email, password } = UserWithPassword
  render(<Login />)

  userEvent.type(screen.getByPlaceholderText(Texts.email), email)
  userEvent.type(screen.getByPlaceholderText(Texts.password), password)

  userEvent.click(screen.getByRole('button', { name: Texts.login }))

  await waitFor(() => {
    expect(screen.getByText(Texts.successFullLogin)).toBeInTheDocument()
  })
})

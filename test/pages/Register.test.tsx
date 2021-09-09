import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { Endpoints } from '../../common/constants/Endpoints'
import HttpStatus from '../../common/constants/HttpStatus'
import { UserWithPassword, USER_EMAIL } from '../../common/fixtures/User'
import Login from '../../src/components/Login'
import en from '../../src/locales/en'
import { setupMswServer, mockRoute, mockRouter } from '../utils/Setup'

mockRouter()
setupMswServer()

const getDialog = async () => {
  render(<Login />)

  userEvent.click(screen.getByRole('button', { name: en.signUp }))

  return within(screen.getByRole('dialog'))
}

it('opens a register dialog on sign up click', async () => {
  const dialog = await getDialog()

  expect(dialog.getByText(en.createAccount)).toBeInTheDocument()
  expect(dialog.getByPlaceholderText(en.email)).toBeInTheDocument()
  expect(dialog.getByPlaceholderText(en.password)).toBeInTheDocument()
  expect(dialog.getByPlaceholderText(en.repeatPassword)).toBeInTheDocument()
  expect(dialog.getByRole('button', { name: en.create })).toBeInTheDocument()
})

it('validates email input', async () => {
  const dialog = await getDialog()

  userEvent.type(dialog.getByPlaceholderText(en.email), 'someEmail')
  userEvent.click(dialog.getByRole('button', { name: en.create }))

  await waitFor(() => {
    expect(dialog.getByText(en.emailRuleFail)).toBeInTheDocument()
  })

  userEvent.type(dialog.getByPlaceholderText(en.email), USER_EMAIL)

  await waitFor(() => {
    expect(dialog.queryByText(en.emailRuleFail)).toBeNull()
  })
})

it('validates password input', async () => {
  const { password } = UserWithPassword
  const dialog = await getDialog()

  userEvent.type(dialog.getByPlaceholderText(en.password), '123')
  userEvent.click(dialog.getByRole('button', { name: en.create }))

  await waitFor(() => {
    expect(dialog.getByText(en.passwordRuleFail)).toBeInTheDocument()
  })

  userEvent.type(dialog.getByPlaceholderText(en.password), password)

  await waitFor(() => {
    expect(dialog.queryByText(en.passwordRuleFail)).toBeNull()
  })
})

it('validates repeat password', async () => {
  const { password } = UserWithPassword
  const dialog = await getDialog()

  userEvent.type(dialog.getByPlaceholderText(en.password), password)
  userEvent.type(dialog.getByPlaceholderText(en.repeatPassword), `${password}`)
  userEvent.click(dialog.getByRole('button', { name: en.create }))

  await waitFor(() => {
    expect(dialog.queryByText(en.passwordsDoNotMatch)).toBeNull()
  })
})

it('shows error text if passwords do not match', async () => {
  const { password } = UserWithPassword
  const dialog = await getDialog()

  userEvent.type(dialog.getByPlaceholderText(en.password), password)
  userEvent.type(
    dialog.getByPlaceholderText(en.repeatPassword),
    `${password}foo`
  )
  userEvent.click(dialog.getByRole('button', { name: en.create }))

  await waitFor(() => {
    expect(dialog.queryByText(en.passwordsDoNotMatch)).toBeInTheDocument()
  })
})

it('shows email confirmation dialog if all fields are correct', async () => {
  const { email, password } = UserWithPassword
  const dialog = await getDialog()

  mockRoute({
    route: Endpoints.register,
    httpStatus: HttpStatus.OK,
    method: 'post',
  })

  userEvent.type(dialog.getByPlaceholderText(en.email), email)
  userEvent.type(dialog.getByPlaceholderText(en.password), password)
  userEvent.type(dialog.getByPlaceholderText(en.repeatPassword), password)
  userEvent.click(dialog.getByRole('button', { name: en.create }))

  await waitFor(() => {
    expect(screen.getByText(en.verifyEmail)).toBeInTheDocument()
  })
})

it('shows email taken toast if email is registered', async () => {
  const { email, password } = UserWithPassword
  const dialog = await getDialog()

  mockRoute({
    route: Endpoints.register,
    httpStatus: HttpStatus.CONFLICT,
    method: 'post',
  })

  userEvent.type(dialog.getByPlaceholderText(en.email), email)
  userEvent.type(dialog.getByPlaceholderText(en.password), password)
  userEvent.type(dialog.getByPlaceholderText(en.repeatPassword), password)
  userEvent.click(dialog.getByRole('button', { name: en.create }))

  await waitFor(() => {
    expect(screen.getByText(en.emailAlreadyTaken)).toBeInTheDocument()
  })
})

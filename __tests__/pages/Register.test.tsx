import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { Endpoints } from '../../common/constants/Endpoints'
import HttpStatus from '../../common/constants/HttpStatus'
import { UserWithPassword, USER_EMAIL } from '../../common/fixtures/User'
import Login from '../../pages/login/Login'
import { Texts } from '../../src/constants/Texts'
import { mockRoute, setupMswServer } from '../utils/Msw'

axios.defaults.adapter = require('axios/lib/adapters/http')

setupMswServer()

const getDialog = async () => {
  render(<Login />)

  userEvent.click(screen.getByRole('button', { name: Texts.signUp }))

  return within(screen.getByRole('dialog'))
}

it('opens a register dialog on sign up click', async () => {
  const dialog = await getDialog()

  expect(dialog.getByText(Texts.createAccount)).toBeInTheDocument()
  expect(dialog.getByPlaceholderText(Texts.email)).toBeInTheDocument()
  expect(dialog.getByPlaceholderText(Texts.password)).toBeInTheDocument()
  expect(dialog.getByPlaceholderText(Texts.repeatPassword)).toBeInTheDocument()
  expect(dialog.getByRole('button', { name: Texts.create })).toBeInTheDocument()
})

it('validates email input', async () => {
  const dialog = await getDialog()

  userEvent.type(dialog.getByPlaceholderText(Texts.email), 'someEmail')
  userEvent.click(dialog.getByRole('button', { name: Texts.create }))

  await waitFor(() => {
    expect(dialog.getByText(Texts.emailRuleFail)).toBeInTheDocument()
  })

  userEvent.type(dialog.getByPlaceholderText(Texts.email), USER_EMAIL)

  await waitFor(() => {
    expect(dialog.queryByText(Texts.emailRuleFail)).toBeNull()
  })
})

it('validates password input', async () => {
  const { password } = UserWithPassword
  const dialog = await getDialog()

  userEvent.type(dialog.getByPlaceholderText(Texts.password), '123')
  userEvent.click(dialog.getByRole('button', { name: Texts.create }))

  await waitFor(() => {
    expect(dialog.getByText(Texts.passwordRuleFail)).toBeInTheDocument()
  })

  userEvent.type(dialog.getByPlaceholderText(Texts.password), password)

  await waitFor(() => {
    expect(dialog.queryByText(Texts.passwordRuleFail)).toBeNull()
  })
})

it('validates repeat password', async () => {
  const { password } = UserWithPassword
  const dialog = await getDialog()

  userEvent.type(dialog.getByPlaceholderText(Texts.password), password)
  userEvent.type(
    dialog.getByPlaceholderText(Texts.repeatPassword),
    `${password}`
  )
  userEvent.click(dialog.getByRole('button', { name: Texts.create }))

  await waitFor(() => {
    expect(dialog.queryByText(Texts.passwordsDoNotMatch)).toBeNull()
  })
})

it('shows error text if passwords do not match', async () => {
  const { password } = UserWithPassword
  const dialog = await getDialog()

  userEvent.type(dialog.getByPlaceholderText(Texts.password), password)
  userEvent.type(
    dialog.getByPlaceholderText(Texts.repeatPassword),
    `${password}foo`
  )
  userEvent.click(dialog.getByRole('button', { name: Texts.create }))

  await waitFor(() => {
    expect(dialog.queryByText(Texts.passwordsDoNotMatch)).toBeInTheDocument()
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

  userEvent.type(dialog.getByPlaceholderText(Texts.email), email)
  userEvent.type(dialog.getByPlaceholderText(Texts.password), password)
  userEvent.type(dialog.getByPlaceholderText(Texts.repeatPassword), password)
  userEvent.click(dialog.getByRole('button', { name: Texts.create }))

  await waitFor(() => {
    expect(screen.getByText(Texts.verifyEmail)).toBeInTheDocument()
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

  userEvent.type(dialog.getByPlaceholderText(Texts.email), email)
  userEvent.type(dialog.getByPlaceholderText(Texts.password), password)
  userEvent.type(dialog.getByPlaceholderText(Texts.repeatPassword), password)
  userEvent.click(dialog.getByRole('button', { name: Texts.create }))

  await waitFor(() => {
    expect(screen.getByText(Texts.emailAlreadyTaken)).toBeInTheDocument()
  })
})

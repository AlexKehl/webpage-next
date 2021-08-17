import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { rest } from 'msw'
import HttpStatus from '../../common/constants/HttpStatus'
import { UserWithPassword, USER_EMAIL } from '../../common/fixtures/User'
import Login from '../../pages/login/Login'
import { Texts } from '../../src/constants/Texts'
import { server } from '../../src/mocks/server'

// axios.defaults.adapter = require('axios/lib/adapters/http')

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

  userEvent.type(dialog.getByPlaceholderText(Texts.email), email)
  userEvent.type(dialog.getByPlaceholderText(Texts.password), password)
  userEvent.type(dialog.getByPlaceholderText(Texts.repeatPassword), password)
  userEvent.click(dialog.getByRole('button', { name: Texts.create }))

  await waitFor(() => {
    expect(screen.getByText(Texts.verifyEmail)).toBeInTheDocument()
    expect(screen.queryByText(Texts.createAccount)).toBeNull()
  })
})

it.only('shows email taken toast if email is registered', async () => {
  const { email, password } = UserWithPassword
  const dialog = await getDialog()

  // server.use(
  //   rest.post('/register', async (_req, res, ctx) => {
  //     return res(ctx.status(HttpStatus.CONFLICT))
  //   })
  // )

  userEvent.type(dialog.getByPlaceholderText(Texts.email), email)
  userEvent.type(dialog.getByPlaceholderText(Texts.password), password)
  userEvent.type(dialog.getByPlaceholderText(Texts.repeatPassword), password)
  userEvent.click(dialog.getByRole('button', { name: Texts.create }))

  await waitFor(() => {
    expect(screen.getByText(Texts.emailAlreadyTaken)).toBeInTheDocument()
  })
})

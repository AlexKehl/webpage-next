import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Endpoints } from '../../common/constants/Endpoints'
import HttpStatus from '../../common/constants/HttpStatus'
import { UserWithPassword } from '../../common/fixtures/User'
import en from '../../src/locales/en'
import { mockRoute, renderWithContext, setupTests } from '../utils/Setup'
import Register from '../../src/components/Register'

setupTests()

const setup = () => {
  const utils = renderWithContext(<Register isOpen={true} onClose={() => {}} />)

  const signUpBtn = screen.getByRole('button', { name: en.create })
  const email = utils.getByPlaceholderText(en.email)
  const password = utils.getByPlaceholderText(en.password)
  const passwordRepeat = utils.getByPlaceholderText(en.repeatPassword)
  return { ...utils, signUpBtn, email, password, passwordRepeat }
}

it('validates email input', async () => {
  const { signUpBtn, email } = setup()

  userEvent.type(email, 'someEmail')
  userEvent.click(signUpBtn)

  await waitFor(() => {
    expect(screen.getByText(en.emailRuleFail)).toBeInTheDocument()
  })
})

it('validates password input', async () => {
  const { signUpBtn, password } = setup()

  userEvent.type(password, '123')
  userEvent.click(signUpBtn)

  await waitFor(() => {
    expect(screen.getByText(en.passwordRuleFail)).toBeInTheDocument()
  })
})

it('validates repeat password', async () => {
  const { signUpBtn, email, password, passwordRepeat } = setup()

  userEvent.type(email, UserWithPassword.email)
  userEvent.type(password, UserWithPassword.password)
  userEvent.type(passwordRepeat, UserWithPassword.password)
  userEvent.click(signUpBtn)

  await waitFor(() => {
    expect(screen.queryByText(en.passwordsDoNotMatch)).not.toBeInTheDocument()
  })
})

it('shows error text if passwords do not match', async () => {
  const { signUpBtn, email, password, passwordRepeat } = setup()

  userEvent.type(email, UserWithPassword.email)
  userEvent.type(password, UserWithPassword.password)
  userEvent.type(passwordRepeat, 'wrongpassword')
  userEvent.click(signUpBtn)

  await waitFor(() => {
    expect(screen.queryByText(en.passwordsDoNotMatch)).toBeInTheDocument()
  })
})

it('shows email confirmation dialog if all fields are correct', async () => {
  const { signUpBtn, email, password, passwordRepeat } = setup()

  mockRoute({
    route: Endpoints.register,
    httpStatus: HttpStatus.OK,
    method: 'post',
    body: {},
  })

  userEvent.type(email, UserWithPassword.email)
  userEvent.type(password, UserWithPassword.password)
  userEvent.type(passwordRepeat, UserWithPassword.password)
  userEvent.click(signUpBtn)

  await waitFor(() => {
    expect(screen.getByText(en.verifyEmail)).toBeInTheDocument()
  })
})

it('shows email taken toast if email is registered', async () => {
  const { signUpBtn, email, password, passwordRepeat } = setup()

  mockRoute({
    route: Endpoints.register,
    httpStatus: HttpStatus.CONFLICT,
    method: 'post',
  })

  userEvent.type(email, UserWithPassword.email)
  userEvent.type(password, UserWithPassword.password)
  userEvent.type(passwordRepeat, UserWithPassword.password)
  userEvent.click(signUpBtn)

  await waitFor(() => {
    expect(screen.getByText(en.emailAlreadyTaken)).toBeInTheDocument()
  })
})

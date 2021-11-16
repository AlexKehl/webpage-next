import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Endpoints } from '../../common/constants/Endpoints'
import HttpStatus from '../../common/constants/HttpStatus'
import { UserWithPassword } from '../../common/fixtures/User'
import Login from '../../src/components/Login'
import en from '../../src/locales/en'
import { mockRoute, setupTests } from '../utils/Setup'
import { FullPageLoaderContextProvider } from '../../src/lib/contexts/FullPageLoaderContext'

setupTests()

const setup = () => {
  const utils = render(
    <FullPageLoaderContextProvider>
      <Login />
    </FullPageLoaderContextProvider>
  )
  const email = utils.getByPlaceholderText(en.email)
  const password = utils.getByPlaceholderText(en.password)
  const submitBtn = utils.getByRole('button', { name: en.login })
  return { ...utils, email, password, submitBtn }
}

it('should show error if email input is not an email', async () => {
  const { email, submitBtn } = setup()

  userEvent.type(email, 'fooBar')
  userEvent.click(submitBtn)

  await waitFor(() => {
    expect(screen.getByDisplayValue('fooBar')).toBeInTheDocument()
    expect(screen.getByText(en.emailRuleFail)).toBeInTheDocument()
  })
})

it('should show error if password is incorrect', async () => {
  const { password, submitBtn } = setup()

  userEvent.type(password, 'fooBar')
  userEvent.click(submitBtn)

  await waitFor(() => {
    expect(screen.getByText(en.passwordRuleFail)).toBeInTheDocument()
  })
})

it('shows wrong credentials error', async () => {
  const user = UserWithPassword

  mockRoute({
    route: Endpoints.login,
    method: 'post',
    httpStatus: HttpStatus.UNAUTHORIZED,
  })

  const { email, password, submitBtn } = setup()

  userEvent.type(email, user.email)
  userEvent.type(password, user.password)
  userEvent.click(submitBtn)

  await waitFor(() => {
    expect(screen.getByText(en.wrongCredentials)).toBeInTheDocument()
  })
})

it('shows generic error if error is unknown', async () => {
  const user = UserWithPassword

  mockRoute({
    route: Endpoints.login,
    method: 'post',
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
  })

  const { email, password, submitBtn } = setup()

  userEvent.type(email, user.email)
  userEvent.type(password, user.password)
  userEvent.click(submitBtn)

  await waitFor(() => {
    expect(screen.getByText(en.unexpectedError)).toBeInTheDocument()
  })
})

it('shows success text on successfull login', async () => {
  const user = UserWithPassword
  const { email, password, submitBtn } = setup()

  mockRoute({
    route: Endpoints.login,
    method: 'post',
    httpStatus: HttpStatus.OK,
    body: {},
  })

  userEvent.type(email, user.email)
  userEvent.type(password, user.password)

  userEvent.click(submitBtn)

  await waitFor(() => {
    expect(screen.getByText(en.successFullLogin)).toBeInTheDocument()
  })
})

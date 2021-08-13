import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import Login from '../../pages/login/Login'
import { Texts } from '../../src/constants/Texts'

axios.defaults.adapter = require('axios/lib/adapters/http')

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

it('shows success text on successfull login', async () => {
  const email = 'test@test.com'
  const password = '12345678'
  render(<Login />)

  userEvent.type(screen.getByPlaceholderText(Texts.email), email)
  userEvent.type(screen.getByPlaceholderText(Texts.password), password)

  userEvent.click(screen.getByRole('button', { name: Texts.login }))

  await waitFor(() => {
    expect(screen.getByText(Texts.successFullLogin)).toBeInTheDocument()
  })
})

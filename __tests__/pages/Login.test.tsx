import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import React from 'react'
import Login from '../../pages/login/Login'
import { Texts } from '../../src/constants/Texts'

const buildLoginForm = () => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}

it('should show error if email input is not an email', async () => {
  // expect(true).toEqual(true)
  render(<Login />)
  const { password } = buildLoginForm()

  userEvent.type(screen.getByPlaceholderText(/email/i), 'fooBar')
  userEvent.type(screen.getByPlaceholderText(/password/i), password)
  userEvent.click(screen.getByRole('button', { name: Texts.password }))

  expect(screen.getByText(Texts.passwordRuleFail)).toBeInTheDocument()
})

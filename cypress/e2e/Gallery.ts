import { AdminUserWithPassword, UserWithPassword } from 'common/fixtures/User'
import Env from 'src/constants/EnvProxy'
import en from 'src/locales/en'

describe('gallery', () => {
  it('can see edit button when admin', () => {
    const { password, email } = AdminUserWithPassword
    cy.visit(`${Env.NEXT_PUBLIC_BASE_URL}/login`)

    cy.findByRole('textbox').type(email)
    cy.findByPlaceholderText(en.password).type(password)
    cy.findByRole('button', { name: en.login }).click()

    cy.findByRole('button', { name: en.gallery }).click()
    cy.findAllByText(en.acryl).first().click()

    cy.findByRole('button', { name: en.edit }).should('exist')
  })

  it('cannot see edit button as normal user', () => {
    const { password, email } = UserWithPassword
    cy.visit(`${Env.NEXT_PUBLIC_BASE_URL}/login`)

    cy.findByRole('textbox').type(email)
    cy.findByPlaceholderText(en.password).type(password)
    cy.findByRole('button', { name: en.login }).click()

    cy.findByTestId('gallerymenu').click()
    cy.findAllByTestId('gallerycategory').first().click()

    cy.findByRole('button', { name: en.edit }).should('not.exist')
  })
})

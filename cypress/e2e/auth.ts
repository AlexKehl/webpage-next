import { BASE_URL } from 'src/constants/EnvProxy'
import en from 'src/locales/en'

const user = { email: 'test@test.com', password: '12345678' }

describe('auth', () => {
  const { password, email } = user
  it('logs in and out successfully', () => {
    cy.visit(`${BASE_URL}/login`)

    cy.findByRole('textbox').type(email)
    cy.findByPlaceholderText(en.password).type(password)
    cy.findByRole('button', { name: en.login }).click()

    cy.findByText(en.successFullLogin).should('exist')
    cy.url().should('equal', `${BASE_URL}/`)

    cy.findByTestId('profilemenu').click()
    cy.findByRole('menuitem', { name: en.logout }).click()

    cy.findByText(en.successFullLogout).should('exist')
    cy.url().should('equal', `${BASE_URL}/login`)
  })
})

import { UserWithPassword } from 'common/fixtures/User'
import { BASE_URL } from 'src/constants/EnvProxy'
import en from 'src/locales/en'

describe('auth', () => {
  const { password, email } = UserWithPassword
  it('logs in and out successfully', () => {
    cy.visit(`${BASE_URL}/login`)

    cy.findByRole('textbox').type(email)
    cy.findByPlaceholderText(en.password).type(password)
    cy.findByRole('button', { name: en.login }).click()

    cy.findByText(en.successFullLogin).should('exist')
    cy.url().should('equal', `${BASE_URL}/`)
    cy.getCookie('accessToken').should('exist')

    cy.findByTestId('profilemenu').click()
    cy.findByRole('menuitem', { name: en.logout }).click()

    cy.findByText(en.successFullLogout).should('exist')
    cy.url().should('equal', `${BASE_URL}/login`)
  })

  it('can visit profile page after login', () => {
    cy.visit(`${BASE_URL}/login`)

    cy.findByRole('textbox').type(email)
    cy.findByPlaceholderText(en.password).type(password)
    cy.findByRole('button', { name: en.login }).click()

    cy.findByTestId('profilemenu').click()
    cy.findByRole('menuitem', { name: en.profile }).click()

    cy.url().should('equal', `${BASE_URL}/profile`)
    cy.findByText('test@test.com').should('exist')
  })
})

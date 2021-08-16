import { BASE_URL } from '../../config'
import { Texts } from '../../src/constants/Texts'
describe('auth', () => {
  it('logs in and out successfully', () => {
    cy.visit(`${BASE_URL}/login`)

    cy.findByRole('textbox').type('test@test.com')
    cy.findByPlaceholderText(Texts.password).type('12345678')
    cy.findByRole('button', { name: Texts.login }).click()

    cy.findByText(Texts.successFullLogin).should('exist')
    cy.url().should('equal', `${BASE_URL}/`)
    cy.getCookie('accessToken').should('exist')

    cy.findByTestId('profilemenu').click()
    cy.findByRole('menuitem', { name: Texts.logout }).click()

    cy.findByText(Texts.successFullLogout).should('exist')
    cy.url().should('equal', `${BASE_URL}/login`)
  })

  it('can visit profile page after login', () => {
    cy.visit(`${BASE_URL}/login`)

    cy.findByRole('textbox').type('test@test.com')
    cy.findByPlaceholderText(Texts.password).type('12345678')
    cy.findByRole('button', { name: Texts.login }).click()

    cy.findByTestId('profilemenu').click()
    cy.findByRole('menuitem', { name: Texts.profile }).click()

    cy.url().should('equal', `${BASE_URL}/profile`)
    cy.findByText('test@test.com').should('exist')
  })
})

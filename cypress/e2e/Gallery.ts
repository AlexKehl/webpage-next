import {
  AdminUserWithPassword,
  UserWithPassword,
} from '../../common/fixtures/User'
import { BASE_URL } from '../../config'
import { Texts } from '../../src/constants/Texts'

describe('gallery', () => {
  it('can see edit button when admin', () => {
    const { password, email } = AdminUserWithPassword
    cy.visit(`${BASE_URL}/login`)

    cy.findByRole('textbox').type(email)
    cy.findByPlaceholderText(Texts.password).type(password)
    cy.findByRole('button', { name: Texts.login }).click()

    cy.findByTestId('gallerymenu').click()
    cy.findAllByTestId('gallerycategory').first().click()

    cy.findByRole('button', { name: Texts.edit }).should('exist')
  })

  it('cannot see edit button as normal user', () => {
    const { password, email } = UserWithPassword
    cy.visit(`${BASE_URL}/login`)

    cy.findByRole('textbox').type(email)
    cy.findByPlaceholderText(Texts.password).type(password)
    cy.findByRole('button', { name: Texts.login }).click()

    cy.findByTestId('gallerymenu').click()
    cy.findAllByTestId('gallerycategory').first().click()

    cy.findByRole('button', { name: Texts.edit }).should('not.exist')
  })
})

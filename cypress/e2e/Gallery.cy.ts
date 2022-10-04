import Env from 'src/constants/EnvProxy'
import en from 'src/locales/en'

describe('gallery', () => {
  it('can see edit button when admin', () => {
    cy.visit(`http://localhost:3000/about`)

    cy.findByText(en.profile).click()
    cy.findByText(en.signIn).click()
  })
})

import en from 'src/locales/en'

describe('gallery', () => {
  it('can see edit button when admin', () => {
    cy.visit(`http://localhost:3000/about`)

    cy.contains(en.profile).click()
    cy.contains(en.signIn).click()
    cy.origin('https://amazoncognito.com/', () => {
      cy.get('.textDescription-customizable').contains('Sign in')
      // cy.contains('Username').click()
      // cy.get('input[placeholder="Username"]').type('alex.kehl.32@gmail.com')
      cy.contains('Sign up').click()
      // cy.findByPlaceholderText('Username').type('alex.kehl.32@gmail.com')
    })
  })
})

describe.only('kek', () => {
  it('can do stuff', () => {
    cy.visit(`http://localhost:3000/gallery/acryl`)
    cy.get('[data-testid="info-icon"]').first().click()
    cy.contains(en.buy).click()
    cy.contains(en.unexpectedError).should('exist')
  })
})

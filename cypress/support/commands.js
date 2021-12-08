
Cypress.Commands.add('login', () => {
  const email = "test@test.com"
  const password = "testtest"

  cy.visit('http://localhost:4200')
  
  cy.get('#explore').should('be.visible')

  cy.document().then((doc) => {
     if(doc.querySelectorAll('#signin').length){
       cy.get('#signin').click()
      cy.get('[formcontrolname="email"]').type(email)
      cy.get('[formcontrolname="password"]').type(password)
      cy.get('[type=submit]').click()
      cy.contains('Success!')
     }
  })

  cy.get('#explore').should('be.visible')
})

/// <reference types="cypress" />

import Chance from 'chance'
const chance = new Chance();

describe('Basic functions for guests', () => {
  before(() => {
    cy.visit('http://localhost:4200')
  })

  it('has correct navigation options', () => {
    cy.contains('Explore').should('be.visible')
    cy.contains('Sign up').should('be.visible')
    cy.contains('Sign in').should('be.visible')
  })

  it('can see feed', () => {
    cy.get('app-feed').should('be.visible')
    cy.get('app-ad-thumbnail').should('be.visible')
    cy.contains('Items per page')
  })

 it('has search option', () => {
    cy.get('#searchInput').should('exist')
  })
})

describe('Authentication', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  const username = chance.string()
  const email = chance.email()
  const password = chance.string({ min: 8, alpha: true, numeric: true })

  it('can register', () => {
    cy.get('#signup').click()
    cy.get('[formcontrolname="username"]').type(username)
    cy.get('[formcontrolname="email"]').type(email)
    cy.get('[formcontrolname="password"]').type(password)

    cy.get('[type=submit]').should('be.disabled')

    cy.get('[formcontrolname="confirmpassword"]').type(password)
  
    cy.get('[type=submit]').should('not.be.disabled')
    cy.get('[type=submit]').click()

    cy.contains('Success!')
  })

  it('can log in with a registered email and correct password', () => {
    cy.get('#signin').click()
    cy.get('[formcontrolname="email"]').type(email)
    cy.get('[formcontrolname="password"]').type(password)

    cy.get('[type=submit]').should('not.be.disabled')
    cy.get('[type=submit]').click()

    cy.contains('Success!')
  })

  it('cannot log in with a registered email and an incorrect password', () => {
    cy.get('#signin').should('be.visible')
    cy.get('#signin').click()
    cy.get('[formcontrolname="email"]').type(email)
    cy.get('[formcontrolname="password"]').type(password + "a")

    cy.get('[type=submit]').should('not.be.disabled')
    cy.get('[type=submit]').click()

    cy.contains('Incorrect password')
  })

  it('cannot register with an already registered email', () => {
    cy.get('#signup').click()
    cy.get('[formcontrolname="username"]').type(username)
    cy.get('[formcontrolname="email"]').type(email)
    cy.get('[formcontrolname="password"]').type(password)
    cy.get('[formcontrolname="confirmpassword"]').type(password)

    cy.get('[type=submit]').should('not.be.disabled')
    cy.get('[type=submit]').click()
    cy.contains("Email already exists")
  })

})


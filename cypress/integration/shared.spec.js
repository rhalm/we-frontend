/// <reference types="cypress" />

import Chance from 'chance'
const chance = new Chance();

describe('Basic shared functions', () => {
  before(() => {
    cy.visit('http://localhost:4200')
  })

  it('contains shared navigation options', () => {
    cy.contains('Explore').should('be.visible')
  })

  it('has feed', () => {
    cy.get('app-feed').should('be.visible')
    cy.get('app-ad-thumbnail').should('be.visible')
    cy.contains('Items per page')
  })

  it('has search option', () => {
    cy.get('#searchInput').should('exist')
  })
})

describe('Feed', () => {
  it('can navigate to ad details', () => {
    cy.get('#explore').click()
    cy.get('app-ad-thumbnail').first().click()
  })
})

describe('Profiles', () => {
  it('can navigate to profiles from ads', () => {
    cy.contains('Explore').click()
    cy.get('app-ad-thumbnail').first().click()

    cy.get('app-profile-info').should('be.visible')
    cy.get('app-profile-info').click()
  })

  it('can see profile\'s ads listed on the profile page', () => {
    cy.get('#explore').click()
    cy.get('app-ad-thumbnail').first().click()
    cy.get('app-profile-info').click()

    cy.get('app-ad-thumbnail').should('be.visible')
  })
})

describe('Search', () => {
  before(() => {
    cy.visit('http://localhost:4200')
  })

  const randomLongStr = chance.string({ length: 100 }) 

  it('should navigate to search result page', () => {
    cy.get('#searchInput').type(" ")
    cy.get('#searchButton').click()
    cy.url().should('include', '/search/')
    cy.get('No result found').should('not.exist')

    cy.get('app-feed').should('be.visible')
    cy.get('app-ad-thumbnail').should('be.visible')
    cy.contains('Items per page')
  })

  it('should show results in a feed', () => {
    cy.get('#searchInput').type(" ")
    cy.get('#searchButton').click()
    cy.get('No result found').should('not.exist');

    cy.get('app-feed').should('be.visible')
    cy.get('app-ad-thumbnail').should('be.visible')
    cy.contains('Items per page')
  })

  it('should show No result found message when there are no results', () => {
    cy.get('#searchInput').type(randomLongStr)
    cy.get('#searchButton').click()
    cy.contains('No result found')
  })
})

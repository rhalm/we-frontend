/// <reference types="cypress" />

import Chance from 'chance'
const chance = new Chance();

describe('Basic functions for members', () => {

  before(() => {
    cy.login()
  })

  it('has correct navigation options', () => {
    cy.contains('Explore').should('be.visible')
    cy.contains('New item').should('be.visible')
    cy.contains('Messages').should('be.visible')
    cy.contains('Profile').should('be.visible')
    cy.contains('Log out').should('be.visible')
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

describe('Managing conversations', () => {
  beforeEach(() => {
    cy.login()
  })

  const title = chance.string({ min: 5, max: 40 })
  const content = chance.string({ min: 0, max: 500 })
  const message = chance.string({ min: 0, max: 500 })

  it('can navigate to messages', () => {
    cy.get('#messages').click()
    cy.url().should('include', '/messages')
  })

  it('can send message to a profile', () => {
    cy.get('app-ad-thumbnail').first().click()
    cy.get('app-profile-info').click()

    cy.get('#sendmessage').should('be.visible')
    cy.get('#sendmessage').click()
    cy.get('[type=submit]').should('be.disabled')
   
    cy.get('[formcontrolname="title"]').type(title)
    cy.get('[formcontrolname="content"]').clear()
    cy.get('[formcontrolname="content"]').type(content)

    cy.get('[type=submit]').click()
    cy.contains('Sent!')
  })

  it('newly created conversation can be seen on the messages page', () => {
    cy.get('#messages').click()
    cy.contains(title)
  })

  it('can send messages to a conversation', () => {
    cy.get('#messages').click()
    cy.contains(title).click()

    cy.get('#sendMessage').type(message)
    cy.get('[type=submit]').click()
    cy.contains(message)
  })

})

describe('Managing ads', () => {

  beforeEach(() => {
    cy.login()
  })

  const title = chance.string({ min: 5, max: 40 })
  const description = chance.string({ min: 0, max: 500 })
  const location = chance.string({ min: 2, max: 20 })
  const category = "Storage"

  const modifiedTitle = chance.string({ min: 5, max: 40 })

  it('can navigate to new item creation page', () => {
    cy.get('#newitem').click()
    cy.url().should('include', '/ad/create')
    cy.get('[type=submit]').should('be.disabled')
  })

  it('cannot create ad with incorrectly filled fields', () => {
    cy.get('#newitem').click()

    cy.get('[formcontrolname="title"]').type(title)
    cy.get('[type=submit]').should('be.disabled')
    cy.get('[formcontrolname="title"]').clear()
  })

 it('can create ad with correct values', () => {
    cy.get('#newitem').click()

    cy.get('[formcontrolname="title"]').type(title)
    cy.get('[formcontrolname="description"]').type(description)
    cy.get('[formcontrolname="location"]').type(location)

    cy.get('mat-select').click()
    cy.get('span').contains(category).click()

    cy.get('[type=submit]').should('not.be.disabled')
    cy.get('[type=submit]').click()
    cy.contains('Success!')
  })

  it('newly created ad should be visible on feed', () => {
    cy.get('#explore').click()
    cy.contains(title)
    cy.contains(category)
    cy.contains(location)
  })

  it('newly created ad should be visible on the user\'s profile page', () => {
    cy.contains('Profile').click()
    cy.contains(title)
    cy.contains(category)
    cy.contains(location)
  })

  it('user should be able to modify their own ad', () => {
    cy.contains('Profile').click()
    cy.contains(title).click()

    cy.get('#edit').should('be.visible')
    cy.get('#edit').click()

    cy.url().should('include', '/edit')

    cy.get('[formcontrolname="title"]').clear()
    cy.get('[formcontrolname="title"]').type(modifiedTitle)

    cy.get('[type=submit]').click()

    cy.contains('Profile').click()
    cy.contains(modifiedTitle)
  })

   it('user should be able to delete their own ad', () => {
     cy.contains('Profile').click()
     cy.contains(modifiedTitle).click()

    cy.get('#delete').should('be.visible')
    cy.get('#delete').click()

    cy.on('window:alert', (txt) => {
         expect(txt).to.contains('Are you sure to delete this item?')
    })
  })

})

describe('Manage profil', () => {

  const introduction = chance.string({ min: 5, max: 100 })

  beforeEach(() => {
    cy.login()
  })

   it('can go to their profile page', () => {
    cy.contains('Profile').click()
    cy.url().should('include', '/profile/')
  })

   it('can modify their profile', () => {
    cy.contains('Profile').click()
    cy.get('#editprofile').should('be.visible')
    cy.get('#editprofile').click()
    cy.get('[formcontrolname="introduction"]').clear()
    cy.get('[formcontrolname="introduction"]').type(introduction)

    cy.get('[type=submit]').click()
    cy.contains('Profile').click()
    cy.contains(introduction)
  })
})
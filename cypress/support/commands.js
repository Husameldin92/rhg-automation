// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command for login
Cypress.Commands.add('loginToRHG', (username = 'hosman+1@jax.de', password = 'Hossamaccent2015+') => {
  cy.visit('/login')
  cy.contains('Alle akzeptieren').click()
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get(':nth-child(5) > .woocommerce-Button').click()
})

// Custom command for navigating to events
Cypress.Commands.add('navigateToEvents', () => {
  cy.visit('/reader/my-events')
  cy.wait(5000)
})

// Custom command for selecting first event
Cypress.Commands.add('selectFirstEvent', () => {
  cy.get(':nth-child(1) > .rounded > .f > .justify-content-between > .atdpack-conference-header > .atdpack-conference-title > a > .text-body')
    .should('be.visible', { timeout: 50000 })
    .click()
  cy.wait(10000)
})

// Custom command for taking scroll screenshots
Cypress.Commands.add('takeScrollScreenshot', (name) => {
  cy.scrollTo('bottom', { duration: 4000 })
  cy.scrollTo('top', { duration: 4000 })
  cy.screenshot(name)
})

// Custom command for clicking menu buttons
Cypress.Commands.add('clickMenuButton', (buttonIndex) => {
  const selector = `.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > :nth-child(${buttonIndex}) > .text-white > .text-nowrap`
  cy.get(selector).should('be.visible', { timeout: 50000 }).click()
  cy.wait(10000)
})

// Custom command for clicking chat button
Cypress.Commands.add('clickChatButton', () => {
  cy.get('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > .chat-bubble > :nth-child(1) > .expand-text-button > .text-nowrap')
    .should('be.visible')
    .click()
  cy.wait(5000)
})

// Custom command for closing chat
Cypress.Commands.add('closeChat', () => {
  cy.get('[style="visibility: visible;"] > .material-icons').click()
  cy.wait(2000)
})

// Custom command for testing video player
Cypress.Commands.add('testVideoPlayer', () => {
  cy.log('Testing video player functionality')
  
  // Check if video player exists
  cy.get('video, iframe[src*="video"], .video-player', { timeout: 10000 }).should('exist')
  
  // Test fullscreen if available
  cy.get('body').then(($body) => {
    if ($body.find('.fullscreen-btn, [title*="fullscreen"], [aria-label*="fullscreen"]').length > 0) {
      cy.get('.fullscreen-btn, [title*="fullscreen"], [aria-label*="fullscreen"]').first().click()
      cy.wait(2000)
      cy.get('body').type('{esc}')
    }
  })
  
  // Test play/pause if available
  cy.get('body').then(($body) => {
    if ($body.find('.play-btn, [title*="play"], [aria-label*="play"], video').length > 0) {
      cy.get('.play-btn, [title*="play"], [aria-label*="play"], video').first().click()
      cy.wait(3000)
      cy.get('.pause-btn, [title*="pause"], [aria-label*="pause"], video').first().click()
    }
  })
})
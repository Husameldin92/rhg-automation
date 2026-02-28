/**
 * Login helper functions for Cypress tests
 * Handles user login (app login), cookie consent, and OneSignal alerts
 * 
 * Usage:
 *   cy.userLogin()
 *   cy.handleCookieConsent()
 *   cy.handleOneSignalAlert()
 */

// Ignore uncaught exceptions from the website
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

/**
 * Handle cookie consent banner
 * Clicks "Alle akzeptieren" button if present
 */
Cypress.Commands.add('handleCookieConsent', () => {
  cy.wait(3000)
  cy.get('body').then(($body) => {
    if ($body.text().includes('Alle akzeptieren')) {
      cy.contains('Alle akzeptieren', { timeout: 10000 })
        .should('be.visible')
        .click()
      cy.wait(2000)
    }
  })
})

/**
 * Handle OneSignal alert notification
 * Clicks cancel button if the alert is present
 */
Cypress.Commands.add('handleOneSignalAlert', () => {
  cy.get('body').then(($body) => {
    if ($body.find('#onesignal-slidedown-cancel-button').length > 0) {
      cy.get('#onesignal-slidedown-cancel-button', { timeout: 10000 })
        .should('be.visible')
        .click()
      cy.wait(1000)
    }
  })
})

/**
 * Perform user login (app login) - the actual app login form
 * Uses USER_USERNAME and USER_PASSWORD from environment variables
 */
Cypress.Commands.add('userLogin', () => {
  const userUsername = Cypress.env('USER_USERNAME')
  const userPassword = Cypress.env('USER_PASSWORD')

  if (!userUsername || !userPassword) {
    throw new Error('USER_USERNAME and USER_PASSWORD must be set in .env file')
  }

  const loginUrl = Cypress.env('LOGIN_URL') || 'https://entwickler.de/login'

  // Visit login page
  cy.visit(loginUrl)
  
  // Handle cookie consent first
  cy.handleCookieConsent()
  
  // Handle OneSignal alert if present
  cy.handleOneSignalAlert()

  // Check if already logged in
  cy.url().then((currentUrl) => {
    if (!currentUrl.includes('/login')) {
      cy.log('Already logged in, skipping login')
      return
    }
    
    // Perform login
    cy.log('Performing user login')
    
    cy.get('#username', { timeout: 10000 }).type(userUsername)
    cy.get('#password').type(userPassword)
    cy.get(':nth-child(5) > .woocommerce-Button').click()

    // Handle case where site might request password again
    cy.get('body').then(($body) => {
      if ($body.find('#password:visible').length > 0) {
        cy.get('#password').type(userPassword)
        cy.get(':nth-child(5) > .woocommerce-Button').click()
      }
    })
    
    // Wait for login to complete
    cy.url({ timeout: 10000 }).should('not.include', '/login')
    
    // Handle OneSignal alert after login if present
    cy.handleOneSignalAlert()
  })
})
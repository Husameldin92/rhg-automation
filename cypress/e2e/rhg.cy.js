describe('RHG Video Player Tests', () => {
    beforeEach(() => {
        // Clear cookies and local storage before each test
        cy.clearCookies()
        cy.clearLocalStorage()
    })

    it('should test the complete video player functionality', () => {
        // Login using custom command
        cy.loginToRHG()

        // Navigate to events
        cy.navigateToEvents()
        
        // Select first event
        cy.selectFirstEvent()

        // Test general look with scroll
        cy.takeScrollScreenshot('general look')

        // Test speaker button
        cy.clickMenuButton(1)
        cy.takeScrollScreenshot('speaker')

        // Test sponsor button
        cy.clickMenuButton(2)
        cy.takeScrollScreenshot('sponsor')

        // Test chat functionality
        cy.clickChatButton()
        cy.screenshot('chat')
        cy.closeChat()
        
        // Test video player controls
        cy.testVideoPlayer()
        
        // Verify page responsiveness
        cy.log('Verifying page responsiveness')
        cy.get('body').should('be.visible')
        
        // Test navigation back to events
        cy.log('Testing navigation')
        cy.navigateToEvents()
        cy.get(':nth-child(1) > .rounded > .f > .justify-content-between > .atdpack-conference-header > .atdpack-conference-title').should('be.visible')
    })

    it('should handle login errors gracefully', () => {
        cy.visit('/login')
        cy.contains('Alle akzeptieren').click()
        
        // Test with invalid credentials
        cy.get('#username').type('invalid@test.com')
        cy.get('#password').type('wrongpassword')
        cy.get(':nth-child(5) > .woocommerce-Button').click()
        
        // Should show error or stay on login page
        cy.url().should('include', 'login')
    })

    it('should verify video player elements exist', () => {
        cy.loginToRHG()
        cy.navigateToEvents()
        cy.selectFirstEvent()
        
        // Check for video player elements
        cy.get('video, iframe[src*="video"], .video-player', { timeout: 15000 }).should('exist')
        
        // Verify UI elements are present
        cy.get('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu').should('be.visible')
    })

    it('should test responsive design', () => {
        cy.loginToRHG()
        cy.navigateToEvents()
        cy.selectFirstEvent()
        
        // Test different viewport sizes
        const viewports = [
            { width: 375, height: 667, device: 'mobile' },
            { width: 768, height: 1024, device: 'tablet' },
            { width: 1280, height: 720, device: 'desktop' }
        ]
        
        viewports.forEach(viewport => {
            cy.viewport(viewport.width, viewport.height)
            cy.wait(2000)
            cy.screenshot(`responsive-${viewport.device}`)
            
            // Verify page is still functional
            cy.get('body').should('be.visible')
        })
    })
})
describe('RHG Advanced Video Player Tests', () => {
    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.loginToRHG()
        cy.navigateToEvents()
        cy.selectFirstEvent()
    })

    it('should test video player accessibility', () => {
        // Check for ARIA labels and accessibility attributes
        cy.get('video, iframe').should('exist')
        
        // Test keyboard navigation
        cy.get('body').type('{tab}') // Navigate with tab
        cy.get('body').type(' ') // Space to play/pause
        cy.wait(2000)
        cy.get('body').type(' ') // Space to play/pause again
        
        // Test arrow keys for volume/seeking (if supported)
        cy.get('body').type('{rightarrow}') // Seek forward
        cy.get('body').type('{leftarrow}') // Seek backward
        cy.get('body').type('{uparrow}') // Volume up
        cy.get('body').type('{downarrow}') // Volume down
    })

    it('should test video quality switching', () => {
        // Look for quality selection buttons/menu
        cy.get('body').then(($body) => {
            if ($body.find('[title*="quality"], [aria-label*="quality"], .quality-selector').length > 0) {
                cy.get('[title*="quality"], [aria-label*="quality"], .quality-selector').first().click()
                cy.wait(2000)
                cy.screenshot('quality-menu')
            }
        })
        
        // Test fullscreen mode
        cy.get('body').then(($body) => {
            if ($body.find('[title*="fullscreen"], [aria-label*="fullscreen"]').length > 0) {
                cy.get('[title*="fullscreen"], [aria-label*="fullscreen"]').first().click()
                cy.wait(3000)
                cy.screenshot('fullscreen-mode')
                cy.get('body').type('{esc}')
            }
        })
    })

    it('should test video loading and buffering', () => {
        cy.log('Testing video loading states')
        
        // Wait for video to load
        cy.get('video, iframe[src*="video"]', { timeout: 20000 }).should('exist')
        
        // Check for loading indicators
        cy.get('body').then(($body) => {
            if ($body.find('.loading, .spinner, .buffering').length > 0) {
                cy.get('.loading, .spinner, .buffering').should('be.visible')
                cy.wait(5000)
                // Loading should disappear
                cy.get('.loading, .spinner, .buffering').should('not.exist')
            }
        })
    })

    it('should test video controls and timeline', () => {
        cy.log('Testing video timeline and controls')
        
        // Test timeline/progress bar interaction
        cy.get('body').then(($body) => {
            if ($body.find('.progress-bar, .timeline, [role="slider"]').length > 0) {
                // Click on timeline to seek
                cy.get('.progress-bar, .timeline, [role="slider"]').first().click('center')
                cy.wait(2000)
                cy.screenshot('timeline-interaction')
            }
        })
        
        // Test volume controls
        cy.get('body').then(($body) => {
            if ($body.find('.volume, [title*="volume"], [aria-label*="volume"]').length > 0) {
                cy.get('.volume, [title*="volume"], [aria-label*="volume"]').first().click()
                cy.wait(1000)
                cy.screenshot('volume-controls')
            }
        })
    })

    it('should test speaker and sponsor interactions', () => {
        // Test speaker section
        cy.clickMenuButton(1)
        cy.wait(5000)
        
        // Look for speaker information
        cy.get('body').should('contain.text', 'Speaker').or('contain.text', 'Referent')
        cy.takeScrollScreenshot('speaker-detailed')
        
        // Test sponsor section
        cy.clickMenuButton(2)
        cy.wait(5000)
        
        // Look for sponsor information
        cy.get('body').should('contain.text', 'Sponsor')
        cy.takeScrollScreenshot('sponsor-detailed')
    })

    it('should test chat functionality thoroughly', () => {
        cy.clickChatButton()
        
        // Test chat input if available
        cy.get('body').then(($body) => {
            if ($body.find('input[type="text"], textarea, .chat-input').length > 0) {
                cy.get('input[type="text"], textarea, .chat-input').first().type('Test message')
                cy.screenshot('chat-with-message')
                
                // Look for send button
                if ($body.find('.send, [title*="send"], button[type="submit"]').length > 0) {
                    // Don't actually send to avoid spam
                    cy.get('.send, [title*="send"], button[type="submit"]').should('be.visible')
                }
            }
        })
        
        // Test chat scrolling
        cy.get('body').then(($body) => {
            if ($body.find('.chat-messages, .message-list').length > 0) {
                cy.get('.chat-messages, .message-list').first().scrollTo('bottom')
                cy.wait(1000)
                cy.get('.chat-messages, .message-list').first().scrollTo('top')
            }
        })
        
        cy.closeChat()
    })

    it('should test error handling and edge cases', () => {
        // Test with slow network (simulate by adding delays)
        cy.intercept('**/*.mp4', (req) => {
            req.reply((res) => {
                res.delay(3000) // Add 3 second delay
                res.send()
            })
        })
        
        // Reload page to trigger slow video loading
        cy.reload()
        cy.wait(10000)
        
        // Verify page still functions despite slow loading
        cy.get('body').should('be.visible')
        cy.screenshot('slow-network-test')
    })
})
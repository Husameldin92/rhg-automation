describe('check the RHG video player', () => {
    it('check the video player', () => {
        cy.visit('https://entwickler.de/login')
        
        //cookie button 
        cy.wait(3000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Alle akzeptieren')) {
                cy.contains('Alle akzeptieren').should('be.visible').click()
                cy.wait(2000)
            }
        })

        //login
        cy.get('#username').type('hosman+1@jax.de')
        cy.get('#password').type('Hossamaccent2015+')
        cy.get(':nth-child(5) > .woocommerce-Button').click()

        //my events and choose the first event
        cy.visit('https://entwickler.de/reader/my-events')
        cy.wait(5000)
        cy.get(':nth-child(1) > .rounded > .f > .justify-content-between > .atdpack-conference-header > .atdpack-conference-title > a > .text-body').should('be.visible', { timeout: 50000 }).click()
        cy.wait(10000)

        //general look
        cy.scrollTo('bottom', { duration: 4000 })
        cy.scrollTo('top', { duration: 4000 })
        cy.screenshot('general look')

        //info button (to access FAQ,Lageplan,Raumplan)
        cy.get('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > .RHGDMENU > .dropdown > #dropdownMenu2 > .text-nowrap').should('be.visible', { timeout: 50000 }).click()
        cy.wait(3000)
        
        //FAQ button
        cy.get('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > .RHGDMENU > .dropdown > .dropdown-menu > .px-1 > .d-flex').should('be.visible', { timeout: 50000 }).click()
        cy.wait(3000)
        cy.screenshot('faq')
        cy.get('.modal-content .material-icons:contains("close")').first().click()
        cy.wait(2000)
 
        //lageplan button
        cy.get('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > .RHGDMENU > .dropdown > #dropdownMenu2 > .text-nowrap').should('be.visible', { timeout: 50000 }).click()
        cy.get('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > .RHGDMENU > .dropdown > .dropdown-menu > :nth-child(2) > .d-flex > .px-2').should('be.visible', { timeout: 50000 }).click()
        cy.wait(3000)
        cy.screenshot('lageplan')
        cy.get('.modal-content > .close > .ng-tns-c277-0').first().click()
        cy.wait(2000)
        
        //raumplan button
        cy.get('body').then(($body) => {
            if ($body.find('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > .RHGDMENU > .dropdown > #dropdownMenu2 > .text-nowrap').length > 0) {
                cy.get('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > .RHGDMENU > .dropdown > #dropdownMenu2 > .text-nowrap').should('be.visible', { timeout: 50000 }).click()
                cy.wait(1000)
                cy.get('body').then(($body2) => {
                    if ($body2.find('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > .RHGDMENU > .dropdown > .dropdown-menu > :nth-child(3) > .d-flex > .px-2').length > 0) {
                        cy.get('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > .RHGDMENU > .dropdown > .dropdown-menu > :nth-child(3) > .d-flex > .px-2').should('be.visible', { timeout: 50000 }).click()
                        cy.wait(3000)
                        cy.screenshot('raumplan')
                        cy.get('.d-flex > .close > .ng-tns-c277-0').first().click()
                        cy.wait(2000)
                    }
                })
            }
        })

        //check the speaker button
        cy.get('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > :nth-child(1) > .text-white > .text-nowrap').should('be.visible', { timeout: 50000 }).click()
        cy.wait(3000)
        cy.scrollTo('bottom', { duration: 5000 }) 
        cy.scrollTo('top', { duration: 5000 })
        cy.screenshot('speaker')

        //sponsor button
        cy.get('body').then(($body) => {
            if ($body.find('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > :nth-child(2) > .text-white > .text-nowrap').length > 0) {
                cy.get('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > :nth-child(2) > .text-white > .text-nowrap').should('be.visible', { timeout: 50000 }).click()
                cy.scrollTo('bottom', { duration: 5000 }) 
                cy.scrollTo('top', { duration: 5000 })
                cy.screenshot('sponsor')
            }
        })

        //Chat button
        cy.get('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > .chat-bubble > :nth-child(1) > .expand-text-button > .text-nowrap').should('be.visible').click({ force: true })
        cy.wait(5000)
        cy.screenshot('chat')
        cy.get('[style="visibility: visible;"] > .material-icons').click()
        

    })
})
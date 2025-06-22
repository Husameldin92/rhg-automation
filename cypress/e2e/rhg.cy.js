describe('check the RHG video player', () => {
    it('check the video player', () => {
        cy.visit('https://entwickler.de/login')
        //cookie
        cy.contains('Alle akzeptieren').click()

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

        //check the speaker button
        cy.get('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > :nth-child(1) > .text-white > .text-nowrap').should('be.visible', { timeout: 50000 }).click()
        cy.wait(10000)
        cy.scrollTo('bottom', { duration: 5000 }) 
        cy.scrollTo('top', { duration: 5000 })
        cy.screenshot('speaker')

        //sponsor button
        cy.get('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > :nth-child(2) > .text-white > .text-nowrap').should('be.visible', { timeout: 50000 }).click()
        cy.scrollTo('bottom', { duration: 5000 }) 
        cy.scrollTo('top', { duration: 5000 })
        cy.screenshot('sponsor')

        //info button (to access FAQ)
        cy.get('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > :nth-child(3) > .text-white > .text-nowrap').should('be.visible', { timeout: 50000 }).click()
        cy.wait(5000)

        //FAQ button
        cy.get('.faq-svg-wrapper').click({ force: true })
        cy.wait(5000)
        cy.scrollTo('bottom', { duration: 5000 }) 
        cy.scrollTo('top', { duration: 5000 })
        cy.screenshot('faq')

        //lageplan button
        cy.get('.lageplan-svg-wrapper').click({ force: true })
        cy.wait(5000)
        cy.scrollTo('bottom', { duration: 5000 }) 
        cy.scrollTo('top', { duration: 5000 })
        cy.screenshot('lageplan')

        //raumplan button
        cy.get('.raumplan-svg-wrapper').click({ force: true })
        cy.wait(5000)
        cy.scrollTo('bottom', { duration: 5000 }) 
        cy.scrollTo('top', { duration: 5000 })
        cy.screenshot('raumplan')

        //Chat button
        cy.get('.align-self-center.mr-2 > readerapp-tutorials-blockbuster-right-menu > .justify-content-between > .top-right-menu > .chat-bubble > :nth-child(1) > .expand-text-button > .text-nowrap').should('be.visible').click({ force: true })
        cy.wait(5000)
        cy.screenshot('chat')
        cy.get('[style="visibility: visible;"] > .material-icons').click()
        
    })
})
describe('Clase de APIs en Cypress', () => {
    it('Clase API', () => {
        const numrand = Math.floor(Math.random()*1000)
        cy.intercept('POST','/api/users').as('UsuarioCreado')
        cy.visit('https://conduit.bondaracademy.com')
        cy.contains(/sign up/i).click()
        cy.get('[placeholder="Username"]').type(`FulanitoBen${numrand}`)
        cy.get('[placeholder="Email"]').type(`francovinci${numrand}@yahoo.com.ar`)
        cy.get('[placeholder="Password"]').type('1234qwerty')
        cy.get('.btn').click()

        cy.wait('@UsuarioCreado').then((interception) => {
            expect(
                interception.response.statusCode).to.equal(201)
           
            //cy.get('.error-messages > :nth-child(1)').should('be.visible') //esto fue para cuando repetimos usuario
            expect(
                interception.response.body.user).to.have.property('email',`francovinci${numrand}@yahoo.com.ar`)
            }
            )
        })
    })

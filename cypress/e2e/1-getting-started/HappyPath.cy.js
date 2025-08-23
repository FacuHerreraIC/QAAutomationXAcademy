describe('HAppyPath-Direccion a UI', ()=> {
it('Datos sin aceptar', () => {
cy.visit('https://endearing-lollipop-19f16d.netlify.app/')
cy.get('[data-cy="nav-interacciones-ui"]').click() 
cy.get('[data-cy="email-input"]').type('Cualquiera@gmail.com')
cy.get('#username').type('Ceci')
cy.get('input[type="password"]').eq(0).type('contraseña')
//cy.get('input[type="password"]').eq(1).type('contraseña')
cy.get('.shadow-sm').eq(3).type('contraseña')
cy.get('[data-cy="role-select"]').select('Manager')
cy.contains('sms').click()
//cy.get('[data-cy="interaction-form"]').contains('Push').click()
//cy.contains('accept').click()
cy.get('[data-cy="submit-button"]').should('be.enabled')
cy.get('[data-cy="submit-button"]').click()

cy.get('[data-cy="terms-error"]').should('be.visible')
cy.contains('accept').click()
cy.get('[data-cy="terms-error"]').should('not.be.visible')
})

 })
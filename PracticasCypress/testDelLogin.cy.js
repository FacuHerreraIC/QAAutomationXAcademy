describe('Clase 2',() => (
// Esto lo que hace es generar el describe y declarar que desde aca
// empieza nuestra funcion ()=>
it('Esta funcion es para ir a la direccion',() => (
cy.visit('https://endearing-lollipop-19f16d.netlify.app/'),
cy.get('[data-cy="nav-interacciones-ui"]').click(),
cy.get('[data-cy="username-input"]').type('Aca va un nombre'),
cy.get('[data-cy="email-input"]').type('nombre@cypress.test'), //Este seria el mejor escenario para trabajar
cy.get('#username').type("Facu"),
cy.get('.shadow-sm').eq(2).type('EstoEsUnaPass'), // Este es el caso menos optimo por ser class posbile a cambio
cy.get('input[type="password"]').eq(1).type('EstoEsUnaPass'), //Este es el segundo mejor escenario
cy.get('[data-cy="role-select"]').select(2),
cy.contains('push').click(), // hay que tener cuidado por si la palabra esta nuevamente en la pag
cy.get('[data-cy="submit-button"]').click(),
cy.get('[data-cy="terms-error"]').should('be.visible'),
cy.contains('terms').click(),
cy.get('[data-cy="terms-error"]').should('not.be.visible'), //Esto es un error, deberia desaparecer a la hora de hacer click
cy.get('[data-cy="submit-button"]').click()
    ))
))


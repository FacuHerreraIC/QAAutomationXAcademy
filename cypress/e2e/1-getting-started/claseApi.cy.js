describe('Clase de APIs en Cypress', () => {
    it.skip('Clase API', () => {
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
                //con esto chequeo si el mail que estoy enviando, es el mismo que la API esta cazando
            }
            )
        })
        it('MockeoDeBack', () => {
        cy.intercept('GET','/api/articles*',
            {
            body:{
                "articles": [
                    {
                    "title": "Pablito clavo un clavito",
                    "description": "Una descripcion",
                    "favoritesCount": 1243
                    }],
            "articlesCount": 10

        }
        }).as('ArticulosDeHoy')
        cy.visit('https://conduit.bondaracademy.com')
        })
    })
// En caso de querer testear valores, datos o informacion del backend y como interacciona con el frontend, 
// ej: Caso del boton con me gusta, existen 3 formas:
// a) Me consigo 1000 amigos y pido que carguen me gusta (Incorrecta)
// b) Le solicito a los pibes de BackEnd que cambien el dato (Incorrectisima)
// c) Cambiar directamente desde inspeccionar elemento (No aplica correctamente)
// d) Interceptar el dato desde que volvio del BackEnd, para poder analizar sin cambiar el valor del 
    //backend (Mockear las validaciones)
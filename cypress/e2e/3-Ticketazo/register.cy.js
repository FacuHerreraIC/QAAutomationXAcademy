describe('Registro de usuario positivo - Ticketazo', () => {
  const registerPage = new RegisterPage()
  
  beforeEach(() => {
    // Interceptar la llamada de registro para simular respuesta exitosa
    cy.intercept('POST', '**/api/register', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Usuario registrado exitosamente',
        userId: 12345
      }
    }).as('registerRequest')
    
    registerPage.visit()
  })

  it('Debería registrar un usuario exitosamente con todos los campos válidos', () => {
    cy.fixture('test-users').then((users) => {
      const userData = { ...users.validUser }
      userData.email = cy.generateUniqueEmail(userData.email)
      userData.confirmEmail = userData.email
      
      registerPage.fillRegistrationForm(userData)
      registerPage.submitForm()

      // Verificar que se hizo la llamada API
      cy.wait('@registerRequest').then((interception) => {
        expect(interception.response.statusCode).to.equal(201)
        expect(interception.response.body.success).to.be.true
      })
      
      // Verificar redirección o mensaje de éxito
      registerPage.shouldShowSuccessMessage()
    })
  })

  it('Debería verificar que localidad depende de provincia seleccionada', () => {
    registerPage.verifyLocalidadDependsOnProvincia()
  })

  it('Debería permitir seleccionar diferentes combinaciones provincia-localidad', () => {
    cy.fixture('test-users').then((users) => {
      const combinaciones = [
        { provincia: 'Córdoba', localidad: 'Córdoba Capital' },
        { provincia: 'Buenos Aires', localidad: 'La Plata' },
        { provincia: 'Santa Fe', localidad: 'Rosario' },
        { provincia: 'Mendoza', localidad: 'Mendoza Capital' }
      ]

      combinaciones.forEach((combo, index) => {
        cy.log(`Probando combinación ${index + 1}: ${combo.provincia} - ${combo.localidad}`)
        
        // Usar datos base del usuario válido
        const userData = { 
          ...users.validUser,
          provincia: combo.provincia,
          localidad: combo.localidad
        }
        userData.email = cy.generateUniqueEmail(userData.email)
        userData.confirmEmail = userData.email
        
        registerPage.visit()
        registerPage.fillRegistrationForm(userData)
        
        // Verificar que los selects tienen los valores correctos
        registerPage.elements.provinciaSelect().should('contain', combo.provincia)
        registerPage.elements.localidadSelect().should('contain', combo.localidad)
      })
    })
  })

  it('Debería cargar opciones en el select de localidad al seleccionar provincia', () => {
    registerPage.selectProvincia('Córdoba')
    
    // Hacer click en el select de localidad para ver las opciones
    registerPage.elements.localidadSelect().click()
    
    // Verificar que aparecen opciones de localidad
    cy.get('ul[role="listbox"] li')
      .should('have.length.at.least', 1)
      .and('contain', 'Córdoba Capital')
  })

  it('Debería filtrar localidades al escribir en el select', () => {
    registerPage.selectProvincia('Córdoba')
    
    // Escribir en el select de localidad para filtrar
    registerPage.elements.localidadSelect().click().type('Villa')
    
    // Verificar que se filtran las opciones
    cy.get('ul[role="listbox"] li')
      .should('have.length.at.least', 1)
      .and('contain', 'Villa María')
  })
})
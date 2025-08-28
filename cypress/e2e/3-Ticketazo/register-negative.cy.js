describe('Registro de usuario negativo - Ticketazo', () => {
  const registerPage = new RegisterPage()
  
  beforeEach(() => {
    // Interceptar llamadas de registro para simular errores
    cy.intercept('POST', '**/api/register', (req) => {
      req.reply({
        statusCode: 400,
        body: {
          success: false,
          message: 'Error de validación'
        }
      })
    }).as('registerRequest')
    
    registerPage.visit()
  })

  it('Debería mostrar error al no seleccionar provincia', () => {
    cy.fixture('test-users').then((users) => {
      registerPage.fillRegistrationForm(users.invalidUsers.sinProvincia)
      registerPage.submitForm()
      
      registerPage.shouldShowErrorMessages()
      registerPage.shouldContainErrorText('provincia')
    })
  })

  it('Debería mostrar error al no seleccionar localidad', () => {
    cy.fixture('test-users').then((users) => {
      // Primero seleccionar provincia para habilitar localidad
      registerPage.selectProvincia('Córdoba')
      
      // Llenar otros campos pero dejar localidad vacía
      const userData = users.invalidUsers.sinLocalidad
      registerPage.elements.firstNameInput().clear().type(userData.firstName)
      registerPage.elements.lastNameInput().clear().type(userData.lastName)
      registerPage.elements.phoneInput().clear().type(userData.phone)
      registerPage.elements.dniInput().clear().type(userData.dni)
      registerPage.fillDateOfBirth(userData.fechaNacimiento)
      registerPage.elements.emailInput().clear().type(userData.email)
      registerPage.elements.confirmEmailInput().clear().type(userData.confirmEmail)
      registerPage.elements.passwordInput().clear().type(userData.password)
      registerPage.elements.confirmPasswordInput().clear().type(userData.confirmPassword)
      
      registerPage.submitForm()
      
      registerPage.shouldShowErrorMessages()
      registerPage.shouldContainErrorText('localidad')
    })
  })

  it('Debería mostrar error al seleccionar localidad sin provincia', () => {
    // Intentar interactuar con localidad sin seleccionar provincia primero
    registerPage.elements.localidadSelect().should('be.disabled')
    
    // Forzar click para verificar que está deshabilitado
    registerPage.elements.localidadSelect().click({ force: true })
    
    // Verificar que no se abre el dropdown
    cy.get('ul[role="listbox"]').should('not.exist')
  })

  it('Debería mostrar error con combinación inválida provincia-localidad', () => {
    cy.fixture('test-users').then((users) => {
      // Seleccionar una provincia
      registerPage.selectProvincia('Córdoba')
      
      // Intentar seleccionar una localidad que no pertenece a esa provincia
      // Esto simularía un caso donde el backend valida la relación
      registerPage.elements.localidadSelect().click().type('La Plata') // Localidad de BA en Córdoba
      
      // Si existe la opción, seleccionarla (aunque sea inválida)
      cy.get('ul[role="listbox"] li').contains('La Plata').click({ force: true })
      
      // Completar el resto del formulario
      const userData = users.validUser
      userData.email = cy.generateUniqueEmail(userData.email)
      userData.confirmEmail = userData.email
      
      registerPage.elements.firstNameInput().clear().type(userData.firstName)
      registerPage.elements.lastNameInput().clear().type(userData.lastName)
      registerPage.elements.phoneInput().clear().type(userData.phone)
      registerPage.elements.dniInput().clear().type(userData.dni)
      registerPage.fillDateOfBirth(userData.fechaNacimiento)
      registerPage.elements.emailInput().clear().type(userData.email)
      registerPage.elements.confirmEmailInput().clear().type(userData.confirmEmail)
      registerPage.elements.passwordInput().clear().type(userData.password)
      registerPage.elements.confirmPasswordInput().clear().type(userData.confirmPassword)
      
      registerPage.submitForm()
      
      // El backend debería rechazar esta combinación
      registerPage.shouldShowErrorMessages()
    })
  })

  it('Debería mantener las selecciones de provincia y localidad después de error', () => {
    cy.fixture('test-users').then((users) => {
      const userData = users.invalidUsers.sinLocalidad
      
      // Seleccionar provincia
      registerPage.selectProvincia(userData.provincia)
      
      // Llenar otros campos pero omitir localidad
      registerPage.elements.firstNameInput().clear().type(userData.firstName)
      registerPage.elements.lastNameInput().clear().type(userData.lastName)
      registerPage.elements.phoneInput().clear().type(userData.phone)
      registerPage.elements.dniInput().clear().type(userData.dni)
      registerPage.fillDateOfBirth(userData.fechaNacimiento)
      registerPage.elements.emailInput().clear().type(userData.email)
      registerPage.elements.confirmEmailInput().clear().type(userData.confirmEmail)
      registerPage.elements.passwordInput().clear().type(userData.password)
      registerPage.elements.confirmPasswordInput().clear().type(userData.confirmPassword)
      
      registerPage.submitForm()
      
      // Verificar que provincia se mantiene seleccionada
      registerPage.elements.provinciaSelect().should('contain', userData.provincia)
      
      // Verificar que localidad sigue habilitado
      registerPage.elements.localidadSelect().should('not.be.disabled')
    })
  })
})
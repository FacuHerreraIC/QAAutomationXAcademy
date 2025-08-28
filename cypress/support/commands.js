// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Generar email único para evitar conflictos en pruebas
Cypress.Commands.add('generateUniqueEmail', (baseEmail) => {
  const timestamp = new Date().getTime()
  return baseEmail.replace('{uniqueId}', timestamp)
})

// Comando para seleccionar provincia
Cypress.Commands.add('selectProvincia', (provinciaName) => {
  const registerPage = new RegisterPage()
  registerPage.selectProvincia(provinciaName)
})

// Comando para seleccionar localidad
Cypress.Commands.add('selectLocalidad', (localidadName) => {
  const registerPage = new RegisterPage()
  registerPage.selectLocalidad(localidadName)
})

// Comando para registrar usuario
Cypress.Commands.add('registerUser', (userData) => {
  const registerPage = new RegisterPage()
  registerPage.visit()
  
  // Generar email único si es necesario
  if (userData.email && userData.email.includes('{uniqueId}')) {
    userData.email = cy.generateUniqueEmail(userData.email)
    userData.confirmEmail = userData.email
  }
  
  registerPage.fillRegistrationForm(userData)
  registerPage.submitForm()
})
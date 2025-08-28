describe('Comportamiento de selects provincia-localidad - Ticketazo', () => {
  const registerPage = new RegisterPage()

  beforeEach(() => {
    registerPage.visit()
  })

  it('Debería cargar todas las provincias disponibles', () => {
    registerPage.elements.provinciaSelect().click()
    
    // Verificar que hay múltiples opciones de provincia
    cy.get('ul[role="listbox"] li')
      .should('have.length.at.least', 5)
      .and('contain', 'Córdoba')
      .and('contain', 'Buenos Aires')
      .and('contain', 'Santa Fe')
  })

  it('Debería filtrar provincias al escribir en el buscador', () => {
    registerPage.elements.provinciaSelect().click().type('Cór')
    
    // Verificar que se filtran las opciones
    cy.get('ul[role="listbox"] li')
      .should('have.length', 1)
      .and('contain', 'Córdoba')
  })

  it('Debería resetear localidad al cambiar de provincia', () => {
    // Seleccionar primera provincia y localidad
    registerPage.selectProvincia('Córdoba')
    registerPage.selectLocalidad('Córdoba Capital')
    
    // Cambiar de provincia
    registerPage.selectProvincia('Buenos Aires')
    
    // Verificar que localidad se resetea
    registerPage.elements.localidadSelect().should('not.contain', 'Córdoba Capital')
    registerPage.elements.localidadSelect().should('contain', 'Selecciona una localidad')
  })

  it('Debería cargar diferentes localidades para diferentes provincias', () => {
    // Probar con Córdoba
    registerPage.selectProvincia('Córdoba')
    registerPage.elements.localidadSelect().click()
    
    cy.get('ul[role="listbox"] li')
      .should('contain', 'Córdoba Capital')
      .and('contain', 'Villa María')
    
    // Probar con Buenos Aires
    registerPage.selectProvincia('Buenos Aires')
    registerPage.elements.localidadSelect().click()
    
    cy.get('ul[role="listbox"] li')
      .should('contain', 'La Plata')
      .and('contain', 'Mar del Plata')
  })

  it('Debería permitir búsqueda en localidades', () => {
    registerPage.selectProvincia('Córdoba')
    
    // Buscar localidad específica
    registerPage.elements.localidadSelect().click().type('Río')
    
    cy.get('ul[role="listbox"] li')
      .should('have.length', 1)
      .and('contain', 'Río Cuarto')
  })
})
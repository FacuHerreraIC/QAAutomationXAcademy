describe('Pruebas E2E para la página de ejemplo', () => {
  beforeEach(() => {
    // Visitar la página antes de cada test
    cy.visit('https://endearing-lollipop-19f16d.netlify.app/')
  })

  // Test 1: Verificar elementos básicos de la página
  it('Debe cargar correctamente la página principal', () => {
    // Verificar título de la página
    cy.title().should('include', 'React App')

    // Verificar elementos principales
    cy.get('header').should('exist')
    cy.get('main').should('exist')
    cy.get('footer').should('exist')

    // Verificar que el contador inicial es 0
    cy.get('[data-testid="counter-value"]').should('contain', '0')
  })

  // Test 2: Probar funcionalidad del contador
  it('Debe funcionar correctamente el contador', () => {
    // Incrementar el contador
    cy.get('[data-testid="increment-button"]').click()
    cy.get('[data-testid="counter-value"]').should('contain', '1')

    // Incrementar varias veces
    cy.get('[data-testid="increment-button"]').click().click()
    cy.get('[data-testid="counter-value"]').should('contain', '3')

    // Decrementar el contador
    cy.get('[data-testid="decrement-button"]').click()
    cy.get('[data-testid="counter-value"]').should('contain', '2')

    // Resetear el contador
    cy.get('[data-testid="reset-button"]').click()
    cy.get('[data-testid="counter-value"]').should('contain', '0')
  })

  // Test 3: Verificar la lista de tareas
  it('Debe manejar correctamente la lista de tareas', () => {
    // Agregar una nueva tarea
    const taskText = 'Nueva tarea de prueba'
    cy.get('[data-testid="task-input"]').type(taskText)
    cy.get('[data-testid="add-task-button"]').click()

    // Verificar que la tarea aparece en la lista
    cy.get('[data-testid="task-list"]').should('contain', taskText)

    // Marcar tarea como completada
    cy.get('[data-testid="task-item"]').first().find('[type="checkbox"]').check()
    cy.get('[data-testid="task-item"]').first().should('have.class', 'completed')

    // Eliminar tarea
    cy.get('[data-testid="task-item"]').first().find('[data-testid="delete-task-button"]').click()
    cy.get('[data-testid="task-list"]').should('not.contain', taskText)
  })

  // Test 4: Validar el formulario de contacto
  it('Debe validar el formulario de contacto', () => {
    // Intentar enviar formulario vacío
    cy.get('[data-testid="submit-contact-button"]').click()
    cy.get('[data-testid="name-error"]').should('contain', 'Name is required')
    cy.get('[data-testid="email-error"]').should('contain', 'Email is required')

    // Rellenar con datos inválidos
    cy.get('[data-testid="contact-name"]').type('a')
    cy.get('[data-testid="contact-email"]').type('email.invalido')
    cy.get('[data-testid="submit-contact-button"]').click()
    cy.get('[data-testid="name-error"]').should('contain', 'Name must be at least 3 characters')
    cy.get('[data-testid="email-error"]').should('contain', 'Email must be valid')

    // Rellenar correctamente
    cy.get('[data-testid="contact-name"]').clear().type('Nombre de prueba')
    cy.get('[data-testid="contact-email"]').clear().type('test@example.com')
    cy.get('[data-testid="contact-message"]').type('Este es un mensaje de prueba')
    cy.get('[data-testid="submit-contact-button"]').click()

    // Verificar mensaje de éxito
    cy.get('[data-testid="success-message"]').should('contain', 'Thank you for your message!')
  })

  // Test 5: Probar el modo oscuro/claro
  it('Debe cambiar entre modo oscuro y claro', () => {
    // Verificar que inicialmente está en modo claro
    cy.get('body').should('not.have.class', 'dark-mode')

    // Cambiar a modo oscuro
    cy.get('[data-testid="theme-toggle"]').click()
    cy.get('body').should('have.class', 'dark-mode')

    // Volver a modo claro
    cy.get('[data-testid="theme-toggle"]').click()
    cy.get('body').should('not.have.class', 'dark-mode')
  })

  // Test 6: Pruebas de accesibilidad
  it('Debe cumplir con estándares básicos de accesibilidad', () => {
    // Verificar contraste de colores
    cy.checkA11y()

    // Verificar que todos los botones tengan texto descriptivo
    cy.get('button').each(($button) => {
      expect($button).to.have.attr('aria-label').or.not.to.be.empty
    })

    // Verificar que las imágenes tengan alt text
    cy.get('img').each(($img) => {
      expect($img).to.have.attr('alt').or.not.to.be.empty
    })
  })
})
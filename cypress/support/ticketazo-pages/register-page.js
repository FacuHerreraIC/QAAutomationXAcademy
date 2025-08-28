class RegisterPage {
    elements = {
        // Selectores basados en los data-cy del HTML proporcionado
        firstNameInput: () => cy.get('[data-cy="input-nombres"]'),
        lastNameInput: () => cy.get('[data-cy="input-apellido"]'),
        phoneInput: () => cy.get('[data-cy="input-telefono"]'),
        dniInput: () => cy.get('[data-cy="input-dni"]'),
        provinciaSelect: () => cy.get('[data-cy="select-provincia"]'),
        localidadSelect: () => cy.get('[data-cy="select-localidad"]'),
        fechaNacimientoInput: () => cy.get('[data-cy="input-fecha-nacimiento"]'),
        emailInput: () => cy.get('[data-cy="input-email"]'),
        confirmEmailInput: () => cy.get('[data-cy="input-confirmar-email"]'),
        passwordInput: () => cy.get('[data-cy="input-password"]'),
        confirmPasswordInput: () => cy.get('[data-cy="input-repetir-password"]'),
        submitButton: () => cy.get('[data-cy="btn-registrarse"]'),
        loginLink: () => cy.get('[data-cy="btn-login-link"]'),
        
        // Opciones de los selects (aparecen después de hacer click)
        provinciaOptions: () => cy.get('ul[role="listbox"] li').contains('Córdoba'),
        localidadOptions: () => cy.get('ul[role="listbox"] li').contains('Córdoba Capital'),
        
        // Mensajes de error
        errorMessages: () => cy.get('.text-danger, .text-red-500, [class*="error"]'),
        successMessage: () => cy.contains('Registro exitoso'),
        
        // Selectores para fecha de nacimiento (segmentos)
        dayInput: () => cy.get('[data-type="day"]'),
        monthInput: () => cy.get('[data-type="month"]'),
        yearInput: () => cy.get('[data-type="year"]')
    }

    visit() {
        cy.visit('https://ticketazo.com.ar/auth/registerUser')
        cy.url().should('include', '/auth/registerUser')
        // Esperar a que los selects estén cargados
        cy.get('[data-cy="select-provincia"]', { timeout: 10000 }).should('be.visible')
    }

    fillRegistrationForm(userData) {
        if (userData.firstName) {
            this.elements.firstNameInput().clear().type(userData.firstName)
        }
        if (userData.lastName) {
            this.elements.lastNameInput().clear().type(userData.lastName)
        }
        if (userData.phone) {
            this.elements.phoneInput().clear().type(userData.phone)
        }
        if (userData.dni) {
            this.elements.dniInput().clear().type(userData.dni)
        }
        if (userData.provincia) {
            this.selectProvincia(userData.provincia)
        }
        if (userData.localidad) {
            this.selectLocalidad(userData.localidad)
        }
        if (userData.fechaNacimiento) {
            this.fillDateOfBirth(userData.fechaNacimiento)
        }
        if (userData.email) {
            this.elements.emailInput().clear().type(userData.email)
        }
        if (userData.confirmEmail) {
            this.elements.confirmEmailInput().clear().type(userData.confirmEmail)
        }
        if (userData.password) {
            this.elements.passwordInput().clear().type(userData.password)
        }
        if (userData.confirmPassword) {
            this.elements.confirmPasswordInput().clear().type(userData.confirmPassword)
        }
    }

    selectProvincia(provinciaName) {
        this.elements.provinciaSelect().click()
        
        // Buscar y seleccionar la opción
        cy.get('ul[role="listbox"] li')
            .contains(provinciaName)
            .click({ force: true })
        
        // Verificar que se seleccionó correctamente
        this.elements.provinciaSelect().should('contain', provinciaName)
    }

    selectLocalidad(localidadName) {
        // Esperar a que el select de localidad esté habilitado
        this.elements.localidadSelect().should('not.be.disabled')
        this.elements.localidadSelect().click()
        
        // Buscar y seleccionar la opción
        cy.get('ul[role="listbox"] li')
            .contains(localidadName)
            .click({ force: true })
        
        // Verificar que se seleccionó correctamente
        this.elements.localidadSelect().should('contain', localidadName)
    }

    fillDateOfBirth(dateString) {
        // Formato esperado: "dd/mm/yyyy"
        const [day, month, year] = dateString.split('/')
        
        this.elements.dayInput().clear().type(day)
        this.elements.monthInput().clear().type(month)
        this.elements.yearInput().clear().type(year)
    }

    submitForm() {
        this.elements.submitButton().click()
    }

    shouldShowSuccessMessage() {
        // Verificar redirección o mensaje de éxito
        cy.url().should('include', '/success', { timeout: 10000 })
            .or(() => {
                this.elements.successMessage().should('be.visible')
            })
    }

    shouldShowErrorMessages() {
        this.elements.errorMessages().should('be.visible')
    }

    shouldContainErrorText(text) {
        this.elements.errorMessages().should('contain', text)
    }

    // Método para verificar dependencia entre provincia y localidad
    verifyLocalidadDependsOnProvincia() {
        // Primero verificar que localidad está deshabilitado sin provincia
        this.elements.localidadSelect().should('be.disabled')
        
        // Seleccionar una provincia
        this.selectProvincia('Córdoba')
        
        // Verificar que localidad ahora está habilitado
        this.elements.localidadSelect().should('not.be.disabled')
    }
}

export default RegisterPage
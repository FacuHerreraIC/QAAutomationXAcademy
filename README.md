# 🚀 QA Automation - Cypress & JavaScript

Repositorio del curso de **QA Automation** especializado en testing end-to-end con **Cypress** y **JavaScript**.

## 📋 Descripción

Este repositorio contiene materiales, ejemplos de código, ejercicios prácticos y proyectos del curso de QA Automation utilizando Cypress como herramienta principal de testing.

## 🎯 Objetivos del Curso

- Aprender los fundamentos de testing automatizado
- Dominar el uso de Cypress para pruebas E2E
- Implementar mejores prácticas en automatización
- Crear frameworks de testing escalables
- Integrar testing en pipelines CI/CD

## 🛠 Stack Tecnológico

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)


## ⚙️ Configuración del Entorno

### Prerrequisitos
- Node.js (v14 o superior)
- npm o yarn
- Git

### Instalación
1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/qa-automation-cypress-js.git
cd qa-automation-cypress-js
```

2. Instala las dependencias:
```bash
npm install
```

3. Abre Cypress:
```bash
npx cypress open
```

O ejecuta en modo headless:
```bash
npx cypress run
```

## 🧪 Ejecución de Pruebas

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas específicas
```bash
npx cypress run --spec "cypress/e2e/my-spec.cy.js"
```

### Ejecutar en navegador específico
```bash
npx cypress run --browser chrome
```

## 📊 Reportes

El proyecto incluye configuración para generar reportes en múltiples formatos:
- HTML Reports (Mochawesome)
- JUnit XML para integración con CI/CD
- JSON reports para procesamiento adicional

## 🔄 Integración Continua

Este repositorio incluye configuración para:
- GitHub Actions
- Jenkins pipeline
- GitLab CI/CD

## 📝 Recursos de Aprendizaje

- [Documentación oficial de Cypress](https://docs.cypress.io/)
- [JavaScript para testing](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [Patrones de diseño para testing](https://martinfowler.com/bliki/PageObject.html)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

- Email: facundo.herrera@mi.unc.edu.ar
- LinkedIn: https://www.linkedin.com/in/facuherrerapythondev/

---

**¡Feliz testing!** 🎯

import { faker } from '@faker-js/faker'

class FaleConosco {
    preencherFormularioContato(){
        cy.get('[data-qa="name"]').type(faker.person.firstName())
        cy.get('[data-qa="email"]').type(faker.internet.email())
        cy.get('[data-qa="subject"]').type(faker.commerce.productName())
        cy.get('[data-qa="message"]').type(faker.commerce.productDescription())

        cy.fixture('example.json').as('arquivo')
        cy.get('input[name="upload_file"]').selectFile('@arquivo')
        cy.get('[data-qa="submit-button"]').click()
    }
}

// Exportar uma nova instancia da classe
export default new FaleConosco()
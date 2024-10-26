import { faker } from '@faker-js/faker'

class Cadastro{
    preencherFormulario() {
        
        //criar const para amazenar o nome do usuario para validar se é mostrado na tela após o cadastro
        const signUpName = faker.person.firstName()

        //variavel de ambiente
        Cypress.env('signUpName', signUpName)


        cy.get('[data-qa="signup-name"]').type(Cypress.env('signUpName'))

        cy.get('[data-qa="signup-email"]').type(faker.internet.email())

        cy.contains('button','Signup').click()

        cy.get('input[type=radio]').check('Mrs')

        cy.get('[data-qa="password"]').type(faker.internet.password({ length: 8 }), { log: false})

        cy.get('[data-qa="days"]').select('12')
        cy.get('[data-qa="months"]').select('11')
        cy.get('[data-qa="years"]').select('1966')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('[data-qa="first_name"]').type(Cypress.env('signUpName'))
        cy.get('[data-qa="last_name"]').type(faker.person.lastName())

        cy.get('[data-qa="company"]').type(faker.company.name())

        cy.get('[data-qa="address"]').type(faker.location.streetAddress())
        cy.get('[data-qa="country"]').select('New Zealand')
        cy.get('[data-qa="state"]').type(faker.location.state())
        cy.get('[data-qa="city"]').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type(faker.string.numeric(9))

        cy.get('[data-qa="create-account"]').click()

        return this
    }

    iniciarCadastro(nome, email){
        cy.get('[data-qa="signup-name"]').type(nome)
        cy.get('[data-qa="signup-email"]').type(email)
        cy.contains('button','Signup').click()

        return this
    }
    verificarSeCadastroFoiConcluido(){
        cy.url().should('includes', 'account_created')
        // https://automationexercise.com/account_created
        cy.get('[data-qa="account-created"]').should('be.visible')
        cy.screenshot()
        cy.get('[data-qa="continue-button"]').click()
        cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'))

        return this
    }
}

export default new Cadastro()
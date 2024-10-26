/// <reference types="cypress"/>

// pom - page object model
import cadastro from '../pages/cadastro'
import faleConosco from '../pages/fale-conosco';
import login from '../pages/login'
import menu from '../pages/menu'

import { faker } from '@faker-js/faker'



describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('/')
    });
    it('Test Case 1: Register User', () => {
        menu.irParaLoginCadastro()
        cadastro
            .preencherFormulario()
            .verificarSeCadastroFoiConcluido()
        
    });
    it('Test Case 2: Login User with correct email and password', () => {
        
        // Preparação
        
        menu.irParaLoginCadastro()

        const signUpName = 'Tester QA luc'

        // Ação
        login.preencherLogin('luc-1724010129957@example.com', '12345')

        //Resultado esperado
        cy.get('b').should('contain', signUpName)
        cy.screenshot()

    });
    it('Test Case 3: Login User with incorrect email and password', () => {
        // Preparação
        
        menu.irParaLoginCadastro()
                
        //Ação
        login.preencherLogin('luc------@example.com','12344')

        //Resultado esperado
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
        cy.screenshot()
    });
    it('Test Case 4: Logout User', () => {
        
        // Preparação
        
        menu.irParaLoginCadastro()

        const signUpName = 'Tester QA luc'
        
        login.preencherLogin('luc-1724010129957@example.com', '12345')

        cy.get('b').should('contain', signUpName)
        cy.screenshot()
        
        //Ação
        menu.irParaLogout()

        //Resultado esperado
        
        //https://automationexercise.com/login
        cy.url().should('contain', 'login')
        cy.contains('Login to your account').should('be.visible')
        cy.screenshot()
    });
    it('Test Case 5: Register User with existing email', () => {
        // Preparação
        
        menu.irParaLoginCadastro()

        //Ação
        cadastro.iniciarCadastro('Tester QA luc', 'luc-1724010129957@example.com')

        //Resultado esperado
        cy.get('.signup-form > form > p')
            .should('be.visible')
            .and('contain', 'Email Address already exist!')
        cy.screenshot()
    })
    it('Test Case 6: Contact Us Form', () => {
         // Preparação
         
         menu.irParaContactUs()
         
         cy.get(`.contact-form h2`)
            .should('be.visible')
            .and('have.text', 'Get In Touch')
        
        //Ação
        faleConosco.preencherFormularioContato()

        //Resultado esperado
        cy.get('.status')
            .should('have.text', 'Success! Your details have been submitted successfully.')
            .should('be.visible')
        cy.screenshot()

        //11. Click 'Home' button and verify that landed to home page successfully
        menu.irParaHome()
        cy.url().should('eq', 'https://automationexercise.com/')

    });
    it('Test Case 8: Verify All Products and product detail page', () => {
        // Preparação
        
        menu.irParaProdutos()

        cy.url()
            .should('contain','products')
        cy.get('.title')
            .should('be.visible')
            .and('contain', 'All Products')
        //Ação
        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
            .first()
            .parent()
            .contains('View Product')
            .click()

        
        //Resultado Esperado

        /*9. Verify that detail detail is visible: 
        product name, category, price, availability, condition, brand*/
        cy.get('.product-information > h2').should('be.visible') //product name
        cy.get('.product-information > span > span').should('be.visible') //price
        cy.get('.product-information > p')
            .should('be.visible')
            .and('have.length', 4)
            .and('contain', 'Category:')    //category
            .and('contain', 'Availability') //availability
            .and('contain', 'Condition:')   //condition
            .and('contain', 'Brand:')       //brand
        cy.screenshot()
    });
    it('Test Case 9: Search Product', () => {
         // Preparação
         
         menu.irParaProdutos()

         cy.url()
             .should('contain','products')
         cy.get('.title')
             .should('be.visible')
             .and('contain', 'All Products')
        
        //Ação
        cy.get('#search_product').type('Dress')
        
        cy.get('#submit_search').click()
        
        //Resultado Esperado
        cy.get('.title')
            .should('be.visible')
            .and('contain', 'Searched Products')

        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
        cy.screenshot()
    });
    it('Test Case 10: Verify Subscription in home page', () => {
        // Preparação
            //acessar o site

        //Ação
        cy.get('#susbscribe_email')
            .scrollIntoView()  // para que a barra de rolagem acompanhe a tela
            .type('tester-luc@example.com')

        cy.get('button#subscribe').click()

        //Resultado Esperado
        cy.contains('You have been successfully subscribed!')
            .scrollIntoView() //para que seja possível visualizar a msg na tela a tempo
            .should('be.visible')
        cy.screenshot()
    });
    it('Test Case 15: Place Order: Register before Checkout', () => {
        //Criar conta
        menu.irParaLoginCadastro()
        cadastro.preencherFormulario()

        cy.url().should('includes', 'account_created')
        cy.get('[data-qa="account-created"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
        cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'))
        
        //Adicionar produtos no carrinho
        cy.get('.single-products')
        .should('be.visible')
        .and('have.length.at.least', 1)
        .first()
        .contains('Add to cart')
        .click()

        cy.contains('button','Continue Shopping').click()

        cy.get('.single-products')
        .should('be.visible')
        .and('have.length.at.least', 1)
        .last()
        .contains('Add to cart')
        .click()

        cy.contains('button','Continue Shopping').click()

        //Checkout
        menu.irParaCart()

        cy.get('.btn-default.check_out')
            .should('be.visible')
            .click()
        cy.contains('Address Details').should('be.visible')
        cy.contains('Review Your Order').should('be.visible')
        cy.get('.form-control').type('ASAP')
        cy.screenshot()
        cy.contains('Place Order').click()
        //Realizar o pagamento
        cy.get('[data-qa="name-on-card"]').type(faker.person.fullName())
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').type(10)
        cy.get('[data-qa="expiry-year"]').type(2040)
        cy.get('[data-qa="pay-button"]').click()

        cy.get('[data-qa="order-placed"]').should('be.visible')
        cy.get('.col-sm-9 > p').should('contain', 'Congratulations! Your order has been confirmed!')
        cy.screenshot()
        cy.get('[data-qa="continue-button"]').click()
        cy.url().should('eq', 'https://automationexercise.com/')
        //Deletar a conta
        menu.irParaDeletarConta()
        cy.get('[data-qa="account-deleted"]').should('be.visible')
        cy.get('.col-sm-9').should('contain', 'Your account has been permanently deleted!')
        cy.screenshot()
        cy.get('[data-qa="continue-button"]').click()
        cy.url().should('eq', 'https://automationexercise.com/')
    });
});


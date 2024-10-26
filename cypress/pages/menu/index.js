class Menu {
    irParaProdutos(){
        cy.contains('Products').click()
    }
    irParaLoginCadastro(){
        cy.contains('Signup').click()
    }
    irParaContactUs(){
        cy.contains('Contact us').click()
    }
    irParaHome(){
        cy.contains('Home').click()
    }
    irParaCart(){
        cy.contains('Cart').click()
    }
    irParaLogout(){
        cy.contains('Logout').click()
    }
    irParaDeletarConta(){
        cy.contains('Delete Account').click()
    }
}

export default new Menu()
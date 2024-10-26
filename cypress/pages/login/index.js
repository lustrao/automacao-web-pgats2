class Login {
    preencherLogin(usuario, senha){
        cy.get('[data-qa="login-email"]').type(usuario)
        cy.get('[data-qa="login-password"]').type(senha, { log: false})
        
        cy.get('[data-qa="login-button"]').click()
    }
}

// Exportar uma nova instancia da classe
export default new Login()
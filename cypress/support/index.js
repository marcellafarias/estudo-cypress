// ***********************************************************
// Esse arquivo funciona como uma Env - Before After hooks que será executado de forma global
// ***********************************************************
//This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

before(() => {
    //cy.server é para route e request
    //necessario antes de startar uma alias/variavel de ambiente
    //pois por boa prática não se usa const ou let para salvar variaveis
    cy.server();
    //esse é o nome de um metodo criado no commands para fazer uma request que cria um usuário.
    cy.createOng();
});

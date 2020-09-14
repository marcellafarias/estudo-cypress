// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// Essa classe funciona como uma screen utils
//onde posso criar metodos que mais utilizo e reaproveitar nos testes.
//
// ***********************************************
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("createOng",() =>{
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/ongs', 
        body: {
            name: "Gatos queridos",
            email: "gatos@mail.com",
            whatsapp: "11984856758",
            city: "Santos",
            uf: "SP",
        }
    }).then(response => {
        //Assert que espera que dentro do body da response exista um atributo do tipo id
        expect(response.body.id).is.not.null
        //metodo que print no teste qual foi o id encontrado dentro do body da request
        cy.log(response.body.id);
        //essa é a declaração da variavel que salva o id da request para ser reaproveitado no teste
        Cypress.env('createdOngId', response.body.id);
    });
})
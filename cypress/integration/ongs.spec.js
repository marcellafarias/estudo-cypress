// Essa marcação é para trazer a documentação do cypress sobre as funções e melhorar o intelissense
///<reference types="cypress" />

describe('Ongs', () => {
    it.skip('devem realizar um cadastro', () => {
        cy.visit('http://localhost:3000/register');
        //cy.get - busca um elemento
        //.type insere um elemento
        cy.get('[data-cy=name]').type('Dogs queridos');
        cy.get('[data-cy=email]').type('dogs@email.com');
        cy.get('[data-cy=whatsapp]').type('11984845645');
        cy.get('[data-cy=city]').type('São Paulo');
        cy.get('[data-cy=uf]').type('SP');

        //Funcionalidade Routing:
        //route é um event listener que fica ouvindo a request para saber se acontece o que se espera
        // Dê start no server com cy.server() no before index
        // crie uma rota com cy.route()
        // atribui rota a um alias .as
        //Fazer isso antes de iniciar a ação que sera o trigger para capturar o alias
        // esperar com cy.wait e fazer uma validação

        //aqui declara a request que deve ser ouvida e dá o nome dela em um alias
        cy.route('POST','**/ongs').as('postOng');

        //trigger ao clicar no botão cadastrar
        cy.get('[data-cy=submit]').click();

        
        //metodo que aguarda que a request seja ouvida pelo alias declarado na route acima
        cy.wait('@postOng').then((xhr) => {
            //validação
            //espera que o status seja igual a 200
            expect(xhr.status).be.eq(200);
            //espera que dentro do body da response tenha um atributo do tipo id
            expect(xhr.response.body).has.property('id');
            //espera que o id da responde não seka nulo
            expect(xhr.response.body.id).is.not.null;
        })
    });

    it.skip('devem realizar um login no sistema', () => {
    cy.visit('http://localhost:3000');
    //aqui reaproveita o metodo global de criar uma ong por request e passa no campo o id salvo da ong criada
    cy.get('input').type(Cypress.env('createdOngId'));
    cy.get('.button').click();
    });

    it.skip('devem realizar o logout o sistema', () => {
    cy.login();
    cy.get('button').click();
    });

    it.skip('devem cadastrar novos casos', () => {
       cy.login();
       
       cy.get('.button').click();

        cy.get('[placeholder="Título do caso"]').type('Animal abandonado');
        cy.get('textarea').type('Animal precisa ter onde morar.');
        cy.get('[placeholder="Valor em reais"]').type('200');
        
        //monitorar uma chamada para fazer os asserts
        //POST 200 /incidents
        cy.route('POST', '**/incidents').as('newIncident');        
        
        cy.get('.button').click();

        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    })

});

    it('devem excluir um caso', () =>{
        cy.createNewIncident();
        cy.login();
        cy.get('ul > :nth-child(1) > button > svg').click();
    })

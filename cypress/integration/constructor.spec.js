describe('constructor page test', () => {
    before(() => {
        cy.visit('http://localhost:3000')
    })
    it('should open constructor page by default', function() {
        cy.contains('Соберите бургер');
    });
    it('should open modal by click on the ingredient', function() {
        cy.wait(2000)
        cy.get('.burger-card').first().as('ingredient')

        cy.get('@ingredient').click()

        cy.get('.modal').find('.ingredient-details').as('ingredientModal')
        cy.get('.modal').contains('Краторная булка N-200i')
        cy.get('body').click(0, 0)
        cy.get('@ingredientModal').should("not.exist")

        cy.get('@ingredient').click()
        cy.get('@ingredientModal').parents('.modal').find('svg').click()
        cy.get('@ingredientModal').should("not.exist")

        cy.get('@ingredient').click()
        cy.get('body').type('{esc}')
        cy.get('@ingredientModal').should("not.exist")


    });
    it('should drag an element', function (){
        cy.get('.burger-card').first().as('ingredient')
        cy.get('.burger-card:nth-child(3)').first().as('sauce')

        cy.get('@ingredient').trigger("dragstart")
        cy.get('.burger-constructor-container')
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");

        cy.get('@sauce').trigger("dragstart")
        cy.get('.burger-constructor-container')
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");
    })

    it('should accept an order', function (){
        cy.get('.offer-block button').click()
        if(cy.contains('Вход')){
            cy.get('input[type=email]').type('envick1@mail.ru')
            cy.get('input[type=password]').type('envick12345')
            cy.get('button').contains('Войти').click()
            cy.get('.offer-block button').click()
            cy.wait(25000)
            cy.get('.modal h2').invoke('text').then(parseInt).should('be.gte', 0)
        }
        else{
            cy.get('.offer-block button').click()
            cy.wait(25000)
            cy.get('.modal h2').invoke('text').then(parseInt).should('be.gte', 0)
        }
        cy.get('.modal').find('svg').click()
        cy.get('.modal').should("have.class", 'hide')
    })
})
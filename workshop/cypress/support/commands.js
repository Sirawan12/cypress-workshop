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
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.on('uncaught:exception', (err, runnable) => {
    cy.log('Uncaught exception detected:', err.message);
    return false;
});


Cypress.Commands.add('verifyMenuTab', () => {
    cy.get(':nth-child(1) > a').should('have.attr', 'href', '/');
    cy.get(':nth-child(2) > a').should('have.attr', 'href', '/cart');
    cy.get(':nth-child(3) > a').should('have.attr', 'href', '/github');
    
})


Cypress.Commands.add('verifyFirstPage', () => {
    const cartValue = 0;
    const totalValue = '0.00';
    cy.get(':nth-child(2) > a').should('have.text', `cart (${cartValue})`);
    cy.get('[data-test="checkout"]').should('have.text', `Total: $${totalValue}`);
    
})




Cypress.Commands.add('selectCoffee', (productName, productPrice) => {
    cy.get(`[data-cy="${productName}"]`)
        .scrollIntoView()
        .then(() => {
            cy.get(`[data-cy="${productName}"]`).should('be.visible').click();
            cy.get(':nth-child(2) > a').should('be.visible').should('have.text', 'cart (1)');
            cy.get('[data-test="checkout"]').should('be.visible').should('have.text', `Total: $${productPrice}`);
        })
    
    cy.get('[data-test="checkout"]').trigger('mouseover');
    cy.get('.list-item > :nth-child(1) > :nth-child(1)').should('have.text', productName);
  
})




Cypress.Commands.add('addProductIndex', (productName, productPrice, count) => {
    const totalPrice = parseFloat(productPrice) * parseFloat(count);
  
    if (count > 1) {
        for (let i = 1; i < count; i++) {
            cy.get(`[aria-label="Add one ${productName}"]`).click();
        }

        cy.get('.unit-desc').should('have.text', ` x ${count}`);
        cy.get('[data-test="checkout"]').should('have.text', `Total: $${totalPrice}.00`);
    }
    
})



Cypress.Commands.add('removeProductIndex', (productName, productPrice, count) => {
    const totalPrice = parseFloat(productPrice) * parseFloat(count);

    if (count > 1) {
        for (let i = 1; i < count; i++) {
            cy.get(`[aria-label="Remove one ${productName}"]`).click();
        }

        cy.get('.unit-desc').should('have.text', ` x ${count}`);
        cy.get('[data-test="checkout"]').should('have.text', `Total: $${totalPrice}.00`);
    }
    
})


Cypress.Commands.add('verifyCoffeeData', (productCount) => {
    cy.get('[data-test="coffee-list"] > li').should('have.length', productCount);

    // check coffee price
    // cy.get(':nth-child(1) > h4').should('have.text', 'Espresso $10.00');
    // cy.get(':nth-child(2) > h4').should('have.text', 'Espresso Macchiato $12.00');
    // cy.get(':nth-child(3) > h4').should('have.text', 'Cappuccino $19.00');
    // cy.get(':nth-child(4) > h4').should('have.text', 'Mocha $8.00');
    // cy.get(':nth-child(5) > h4').should('have.text', 'Flat White $18.00');
    // cy.get(':nth-child(6) > h4').should('have.text', 'Americano $7.00');
    // cy.get(':nth-child(7) > h4').should('have.text', 'Cafe Latte $16.00');
    // cy.get(':nth-child(8) > h4').should('have.text', 'Espresso Con Panna $14.00');
    // cy.get(':nth-child(9) > h4').should('have.text', 'Cafe Breve $15.00');
})


Cypress.Commands.add('verifyFirstCart', (productName, productPrice) => {
    const countValue = 1;

    cy.get(':nth-child(2) > a').click();
    cy.get('.list-item > :nth-child(3)').should('have.text', `$${productPrice}`);
    cy.get('ul[data-v-8965af83=""] > .list-item > :nth-child(1)').should('have.text', productName);
    cy.get(':nth-child(2) > .unit-desc').should('have.text', `$${productPrice} x ${countValue}`);
})



Cypress.Commands.add('addProductCart', (productName, productPrice, count) => {
    const totalPrice = parseFloat(productPrice) * parseFloat(count);

    if (count > 1) {
        for (let i = 1; i < count; i++) {
            cy.get(`:nth-child(2) > .unit-controller > [aria-label="Add one ${productName}"]`).click();
        }

        cy.get(':nth-child(2) > .unit-desc').should('have.text', `$${productPrice} x ${count}`);
        cy.get('.list-item > :nth-child(3)').should('have.text', `$${totalPrice}.00`);
    }
})


Cypress.Commands.add('removeProductCart', (productName, productPrice, count) => {
    const totalPrice = parseFloat(productPrice) * parseFloat(count);

    if (count > 1) {
        for (let i = 1; i < count; i++) {
            cy.get(`:nth-child(2) > .unit-controller > [aria-label="Remove one ${productName}"]`).click();
        }

        cy.get(':nth-child(2) > .unit-desc').should('have.text', `$${productPrice} x ${count}`);
        cy.get('.list-item > :nth-child(3)').should('have.text', `$${totalPrice}.00`);
    }
})


Cypress.Commands.add('checkout', (name, email) => {
    cy.get('[data-test="checkout"]', {timeout: 50000}).should('be.visible').click();
    cy.get('section').should('be.visible');
    cy.get('h1').should('have.text', 'Payment details');
    cy.get('#name').type(name);
    cy.get('#email').type(email);
    cy.get('#submit-payment').should('be.visible').click();
   
    // checkout and verify
    cy.get('.snackbar').should('be.visible').and('have.text', 'Thanks for your purchase. Please check your email for payment.');
})
import 'cypress-plugin-steps'

describe('coffee shop', () => {
  it('buy coffee and payment flow - 01', () => {
    cy.step('Open a page')
    cy.visit('https://coffee-cart-steel.vercel.app/')
    cy.verifyMenuTab();
    cy.verifyCoffeeData(9);
    cy.verifyFirstPage();

    cy.step('Add product to cart')
    cy.selectCoffee('Americano', '7.00').then(() => {

      cy.step('Increase Products')
      cy.addProductIndex('Americano', '7.00', '3');
    })

    cy.step('Checkout')
    cy.checkout('ploy', 'sirawan@mail.com')
  })

  it('buy coffee and payment flow - 02', () => {
    cy.step('Open a page')
    cy.visit('https://coffee-cart-steel.vercel.app/')
    cy.verifyMenuTab();
    cy.verifyCoffeeData(9);
    cy.verifyFirstPage();

    cy.step('Add product to cart')
    cy.selectCoffee('Americano', '7.00');

    cy.verifyFirstCart('Americano', '7.00').then(() => {
      cy.step('Increase Products')
      cy.addProductCart('Americano', '7.00', '3');

      cy.step('Decrease Products')
      cy.removeProductCart('Americano', '7.00', '2');
    });

    cy.step('Checkout')
    cy.checkout('ploy', 'sirawan@mail.com')
  })
})
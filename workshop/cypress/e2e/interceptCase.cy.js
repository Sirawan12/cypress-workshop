import 'cypress-plugin-steps'

describe('coffee shop', () => {
  before(() => {
    // Run once before all test
    cy.intercept(
      {
        method: "POST",
        url: "https://www.google-analytics.com/**",
      },
      { message: "ieieiie" }
    ).as("GoogleAnalytics");

    cy.intercept(
      {
        method: "GET",
        url: "/list.json",
      },
      { 
        delay: 3000,
        fixture: "products.json"
      }
    ).as("List of products");
  })
  
  beforeEach(() => {
    // Run before each test
  })

  it('buy coffee and payment flow - 02', () => {
    cy.step('Open a page')
    cy.visit('https://coffee-cart-steel.vercel.app/')
    cy.verifyMenuTab();
    cy.verifyCoffeeData(2);
    cy.verifyFirstPage();

    cy.step('Add product to cart')
    cy.selectCoffee('Banana', '10.00');

    cy.verifyFirstCart('Banana', '10.00').then(() => {
      cy.step('Increase Products')
      cy.addProductCart('Banana', '10.00', '3');

      cy.step('Decrease Products')
      cy.removeProductCart('Banana', '10.00', '2');
    });

    cy.step('Checkout')
    cy.checkout('ploy', 'sirawan@mail.com')
  })
})
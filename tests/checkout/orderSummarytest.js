import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { rednderPaymentSummary } from "../../scripts/checkout/paymentSummary.js"; 
import { loadProductsFromBackend,loadProductsFetch } from "../../data/products.js"; 

describe('Test suite: render order summary ', () => {
  // Define productId






1 and productId






2 in the scope of the describe block
  // so they are available to all 'it' blocks and 'beforeEach'.
  const productId






1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId






2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  // we'll use the done function provided by jasmine to wait till the products are retrieved first 
  beforeAll((done)=>{
    loadProductsFetch().then(()=>{
      done();
    })
  })

  beforeEach(() => {
    spyOn(localStorage, 'setItem'); // This is good for setup before each test

    // Set up the DOM for each test
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    // Mock localStorage.getItem for each test
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId






: productId






1, // Use the shared variables
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId






: productId






2, // Use the shared variables
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    // Load from storage and render the summary
    loadFromStorage();
    renderOrderSummary();
    rednderPaymentSummary();

  });

  // Clean up the DOM after each test
 
  

  

  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId






1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId






2}`).innerText
    ).toContain('Quantity: 1');
    expect(document.querySelector(`.js-product-name-${productId






1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs')
  });

  it('removes a product', () => {
    document.querySelector(`.js-delete-link-${productId






1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId






1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId






2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId






).toEqual(productId






2);
    //Intermediate Size Basketball
    expect(document.querySelector(`.js-product-name-${productId






2}`).innerText).toEqual('Intermediate Size Basketball')

  });
  it('checks the price string ',()=>{
    expect(document.querySelector('.js-product-price').innerText).toContain('$')
  })
  it('updates the delivery option',()=>{
    let input  = document.querySelector(`.js-delivery-option-input${productId






1,'3'}`)
    input.click()
    expect(input.checked).toBeTrue();
    expect(cart.length).toEqual(2)
    expect(cart[0].productId






).toEqual(productId






1)
    expect(cart[0].deliveryOptionId).toEqual('3')
    //cont from the last question of exercise 16j inshAllah
    

  })
  it('checks the total amount',()=>{
    let total = document.querySelector('.js-payment-summary').innerText
    expect(total).toContain('$ 52.51')
    console.log(total)

  })    

});
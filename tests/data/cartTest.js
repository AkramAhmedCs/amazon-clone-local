import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

// === Helper function to spy on localStorage safely ===
function setupLocalStorageSpies(getItemCallback) {
  // Spy on localStorage.setItem if not already spied on
  if (!localStorage.setItem.calls) {
    spyOn(localStorage, 'setItem');
  } else {
    localStorage.setItem.calls.reset();
  }

  // Spy on localStorage.getItem and apply the custom callback
  if (!localStorage.getItem.calls) {
    spyOn(localStorage, 'getItem').and.callFake(getItemCallback);
  } else {
    localStorage.getItem.and.callFake(getItemCallback);
    localStorage.getItem.calls.reset();
  }
}

// === TEST SUITE: Add to Cart ===
describe('test suite: add to cart', () => {
  beforeEach(() => {
    // Setup empty cart
    setupLocalStorageSpies(() => JSON.stringify([]));

    // Add a required DOM element for the cart system
    document.querySelector('.js-checkout-header-middle-section')?.remove();
    const headerDiv = document.createElement('div');
    headerDiv.className = 'js-checkout-header-middle-section';
    document.body.appendChild(headerDiv);
  });

  afterEach(() => {
    document.querySelector('.js-checkout-header-middle-section').innerHTML = '';
  });

  it('adds an existing product to the cart', () => {
    // Set up cart with an existing product
    setupLocalStorageSpies(() => JSON.stringify([{
      productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));

    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    // Should increase quantity to 2
    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('adds a new product to the cart', () => {
    setupLocalStorageSpies(() => JSON.stringify([]));
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    // Should create a new entry with quantity 1
    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});


// === TEST SUITE: Remove from Cart ===
describe('test suite: removing from cart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    // Set up cart with 2 items
    setupLocalStorageSpies(() => JSON.stringify([
      { productID: productId1, quantity: 2, deliveryOptionId: '1' },
      { productID: productId2, quantity: 1, deliveryOptionId: '2' }
    ]));
    loadFromStorage();

    // DOM setup
    const headerDiv = document.createElement('div');
    headerDiv.className = 'js-checkout-header-middle-section';
    document.body.appendChild(headerDiv);
  });

  afterEach(() => {
    document.querySelector('.js-checkout-header-middle-section').innerHTML = '';
  });

  it('removes an item from cart', () => {
    removeFromCart(productId1);

    // Only the second item should remain
    expect(cart.length).toEqual(1);
    expect(cart[0].productID).toEqual(productId2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('removes an item that doesnt exist', () => {
    removeFromCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

    // No changes should happen
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});


// === ✅ UPDATED TEST SUITE: Update Delivery Option ===
describe('test suite: update delivery option', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    // Set up localStorage with two products
    setupLocalStorageSpies(() => JSON.stringify([
      { productID: productId1, quantity: 2, deliveryOptionId: '1' },
      { productID: productId2, quantity: 1, deliveryOptionId: '2' }
    ]));
    loadFromStorage();

    // DOM setup for summary containers
    const container = document.createElement('div');
    container.className = 'js-test-container';
    container.innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>`;
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up DOM
    document.querySelector('.js-test-container')?.remove();
  });

  it('updates the delivery option', () => {
    
  });

    it('removes an item from cart', () => {
    removeFromCart(productId1);

    // Only the second item should remain
    expect(cart.length).toEqual(1);
    expect(cart[0].productID).toEqual(productId2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('updates an item that doesnt exist', () => {
    updateDeliveryOption('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

    // No changes should happen
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
  it('updates a delivery option  that doesnt exist', () => {
    updateDeliveryOption('83d4ca15-0f35-48f5-b7a3-1ea210004f2e','5');

    // No changes should happen
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

});

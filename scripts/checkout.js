import { renderOrderSummary } from "./checkout/orderSummary.js";
import { rednderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/car.js';
import { loadProductsFromBackend, loadProductsFetch } from "../data/products.js";
import { loadCartFromBackend, loadCartFetch } from "../data/cart.js";
// import '../data/backend-practice.js'
// import '../data/cart-class.js'

async function loadPage() {
  try {
    await Promise.all([
     loadProductsFetch(),
     loadCartFetch()
    ])
  } catch (error) {
    console.log(`${error}`);
  }

  renderOrderSummary();
  rednderPaymentSummary();
}

loadPage();
/*
  --- Async / Await Basics ---
  - async wraps a function in a promise
  - allows you to use await to pause code until a promise is resolved
  - useful for waiting for API calls or long operations before continuing

  --- Throwing Errors ---
  - throw manually creates an error
  - you can catch it using try/catch blocks

  --- What’s a Promise? ---
  - A Promise wraps anything that might take time (like API calls)
  - It helps make sure your code waits before moving forward
  - resolve is called when the async task finishes
  - resolve can also pass values that get shared with .then()

  --- Promise.all ---
  - Lets you wait for multiple promises in parallel
  - Example:
    Promise.all([
      loadProductsFetch(),
      new Promise((resolve) => {
        loadCartFromBackend(() => {
          resolve();
        });
      })
    ]).then((values) => {
      console.log(values);
      renderOrderSummary();
      rednderPaymentSummary();
    });

  --- Old School (Nested Callback Style) ---
  loadProductsFromBackend(() => {
    loadCartFromBackend(() => {
      renderOrderSummary();
      rednderPaymentSummary();
    });
  });

  --- .then Chaining Example ---
  .then((value) => {
    console.log(value);
    return;
  }).then(() => {
    // next action
  });
*/

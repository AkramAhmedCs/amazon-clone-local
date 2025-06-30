import { renderOrderSummary } from "./checkout/orderSummary.js";
import { rednderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/car.js';
import { loadProductsFromBackend, loadProductsFetch } from "../data/products.js";
import { loadCartFromBackend } from "../data/cart.js";
// import '../data/backend-practice.js'
// import '../data/cart-class.js
// '

/*
  async wraps a function in a promise
  so you can wait for it to finish using .then or await

  we use async cuz it allows us to use await which lets us wait for a promise to finish loading 
*/
async function loadPage() {
  // console.log('load page');
  await loadProductsFetch();

  // if the resolve returns a value, you can just save the function in a variable
  const value = await new Promise((resolve) => {
    loadCartFromBackend(() => {
      resolve('value 3');
    });
  });

  renderOrderSummary();
  rednderPaymentSummary();

  // return 'value2'; // this gets saved in a resolve
}

loadPage();

/*
  What’s a Promise?
  - Basically, you wrap anything that might take time inside a Promise to make sure you wait for it to load before moving on to the next step.
  - resolve is called after the function is done, signaling that the previous async function is done loading (resolved).
  - You can use .then to chain multiple async functions that wait for one another in order.
  - You can pass a value to resolve to share it across promises.
  - resolve is similar to the done function from Jasmine.
*/

/*
  Promise.all:
  - Allows you to wait for multiple promises to finish at the same time instead of chaining them in multiple .then() blocks.
*/

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCartFromBackend(() => {
      resolve();
    });
  })
]).then((values) => {
  // values: [value from loadProductsFetch, undefined (because we gave no value to the second resolve)]
  console.log(values);
  renderOrderSummary();
  rednderPaymentSummary();
});
*/

/*
.then((value) => {
  console.log(value);
  return;
}).then(() => {

})
*/

/*
Alternative nested callback version:
loadProductsFromBackend(() => {
  loadCartFromBackend(() => {
    renderOrderSummary();
    rednderPaymentSummary();
  });
});
*/

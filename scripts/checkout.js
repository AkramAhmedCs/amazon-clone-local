import { renderOrderSummary } from "./checkout/orderSummary.js";
import { rednderPaymentSummary } from "./checkout/paymentSummary.js";
//import '../data/car.js';
import { loadProductsFromBackend,loadProductsFetch } from "../data/products.js";
import { loadCartFromBackend } from "../data/cart.js";
//import '../data/backend-practice.js'
//import '../data/cart-class.js
//'

//resolve is similar to the done function from jasmine 

//whats a promise?
// basically u wrap anything that might take time inside a promise to make sure u wait for it to load before moving on to the next step
// resolve is called after the function is done signaling that the prev async function is done loading (resolved)
// u can use then to have multiple async functions that wait for one and other in order
//u can share a value in resolve in order to share it accross promises



//promise.all allows u to wait for multiple promises to finish at the same time instead of doing them in multiple promises 

Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCartFromBackend(()=>{
    resolve();
   });
  })


]).then((values)=>{
  //gives an array of values, one from the first resolve (value1) and undefined from the second resolve since we gave it no value
  console.log(values)
  renderOrderSummary();
  rednderPaymentSummary();
})
/*
.then((value)=>{
    console.log(value)
   return 
  }).then(()=>{
  
  })
})
*/



/*
loadProductsFromBackend(()=>{
  loadCartFromBackend(()=>{
  renderOrderSummary();
  rednderPaymentSummary();
  });
});
*/
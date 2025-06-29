import { renderOrderSummary } from "./checkout/orderSummary.js";
import { rednderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/car.js';
import { loadProductsFromBackend } from "../data/products.js";

//import '../data/backend-practice.js'

//import '../data/cart-class.js' 
loadProductsFromBackend(()=>{
  renderOrderSummary();
  rednderPaymentSummary();
});

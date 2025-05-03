import { cart, removeFromCart,calculateCartQuantity,updateQuantity,updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatMoney } from "./utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from "../data/deliveryOptions.js";
const today = dayjs();
const deliveryDate = today.add(7,'day')
console.log(deliveryDate.format('dddd, MMMM D'));
//we used 1 dot because we are in the same folder 
let cartSummarayHTML = '';
cart.forEach((cartItem) => {
  const productID = cartItem.productID;
  let matchingProduct;
  products.forEach((product)=>{
    if(product.id === productID){
      matchingProduct = product;
    }
  })

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if (option.id == deliveryOptionId){
      deliveryOption = option;
    }
  });
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays,'day');
  const dateString = deliveryDate.format('dddd, MMMM D');
  // instead of saying option 1 each time in the buttons for the delivery ,we'll use the product id sicne its unique 
  cartSummarayHTML += 
  `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatMoney(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label  js-quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link js-update-quantity-link link-primary"data-product-id="${matchingProduct.id}" >
                    Update
                  </span>
                  <input class = "quantity-input link-primary"></input>
                  <span class = "save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link " data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               ${deliveryOptionsHtml(matchingProduct,cartItem)}
              </div>
            </div>
          </div>
  `;

});
function deliveryOptionsHtml(matchingProduct,cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'day');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatMoney(deliveryOption.priceCents)} -`;
    //ternary operator if the delivery option is free then it will be free otherwise it will be the price of the delivery option
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId ;
    html += `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-product-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
          ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
    `
  });
  return html;
}
document.querySelector('.js-order-summary').innerHTML = cartSummarayHTML;
updateCartQuantityDisplay();
const deleteLinks = document.querySelectorAll('.js-delete-quantity-link');
deleteLinks.forEach((link)=>{
  link.addEventListener('click',()=>{
    const prouctID = link.dataset.productId;
    // we'll use the removeFromCart function from the cart.js file to remove the item from the cart
    removeFromCart(prouctID);
    const container = document.querySelector(`.js-cart-item-container-${prouctID}`);
    console.log(container);
    container.remove();
    updateCartQuantityDisplay();
      //every item from the dom has the remove method which removes the item from the dom

  })
})
const updateLinks  = document.querySelectorAll('.js-update-quantity-link');
updateLinks.forEach((link)=>{
  link.addEventListener('click',()=>{
    const productID = link.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productID}`);
    container.classList.add('is-editing-quantity');
    
  })
})
const saveLinks = document.querySelectorAll('.save-quantity-link');
saveLinks.forEach(((link)=>{
  link.addEventListener('click',()=>{
    const productID = link.dataset.productId;
    const inputQuantity = document.querySelector('.quantity-input').value;
    const container = document.querySelector(`.js-cart-item-container-${productID}`);
    container.classList.remove('is-editing-quantity');
    updateQuantity(productID,Number(inputQuantity));
    updateCartQuantityDisplay();
    const quantityLabel = document.querySelector('.js-quantity-label');
    quantityLabel.innerHTML = inputQuantity;

  })
}))
function updateCartQuantityDisplay() {
  const quantity = calculateCartQuantity();
  document.querySelector('.js-checkout-header-middle-section').innerHTML = `Checkout: (${quantity} items)`;
}
//function getDate(deliveryOption) {
 //const today = dayjs();
 // const deliveryDate = today.add(deliveryOption.deliveryDays,'day');
 // const dateString = deliveryDate.format('dddd, MMMM D');
 // return dateString;
//}
document.querySelectorAll('.js-delivery-option').forEach(element => {
  element.addEventListener('click', () => {
    const productID = element.dataset.productId;
    const deliveryOptionId = element.dataset.productDeliveryOptionId;
    updateDeliveryOption(productID, deliveryOptionId);
  });
});
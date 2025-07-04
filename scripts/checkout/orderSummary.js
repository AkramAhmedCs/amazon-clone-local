import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatMoney } from "../utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { rednderPaymentSummary } from "./paymentSummary.js";
import { calculateDeliveryDate } from "../utils/deliveryOptipns.js";

export function renderOrderSummary() {
  let cartSummarayHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    if (!matchingProduct) {
      console.warn("Missing product for", cartItem);
      return;
    }

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummarayHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">Delivery date: ${dateString}</div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">${matchingProduct.name}</div>
            <div class="product-price js-product-price">${matchingProduct.getPrice()}</div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span></span>
              <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${matchingProduct.id}">Update</span>
              <input class="quantity-input link-primary"></input>
              <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link js-delete-link-${matchingProduct.id} link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">Delete</span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryOptionsHtml(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHtml(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatMoney(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
        <div class="delivery-option js-delivery-option js-delivery-optionTest${matchingProduct.id}${deliveryOption.id}" data-product-id="${matchingProduct.id}" data-product-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input js-delivery-option-input${matchingProduct.id}${deliveryOption.id}" name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString} Shipping</div>
          </div>
        </div>
      `;
    });
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummarayHTML;
  updateCartQuantityDisplay();

  const deleteLinks = document.querySelectorAll('.js-delete-quantity-link');
  deleteLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderOrderSummary();
      rednderPaymentSummary();
      updateCartQuantityDisplay();
    });
  });

  const updateLinks = document.querySelectorAll('.js-update-quantity-link');
  updateLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });

  const saveLinks = document.querySelectorAll('.save-quantity-link');
  saveLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      const inputQuantity = container.querySelector('.quantity-input').value;

      container.classList.remove('is-editing-quantity');
      updateQuantity(productId, Number(inputQuantity));
      renderOrderSummary();
      updateCartQuantityDisplay();
      rednderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach(element => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.productDeliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      rednderPaymentSummary();
    });
  });
}

function updateCartQuantityDisplay() {
  const quantity = calculateCartQuantity();
  document.querySelector('.js-checkout-header-middle-section').innerHTML = `Checkout: (${quantity} items)`;
}

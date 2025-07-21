import { orders } from '../data/orders.js';
import { formatMoney } from './utils/money.js';
import { loadProductsFetch, getProduct } from '../data/products.js';
import { getDeliveryOption } from '../data/deliveryOptions.js';
import { calculateDeliveryDate } from './utils/deliveryOptipns.js';
import { addToCart } from '../data/cart.js';

async function run() {
  console.log('run() function executed.');
  await loadProductsFetch();
  createOrdersHtml();
}
run();

export async function createOrdersHtml() {
  let ordersHtml = '';

  for (const order of orders) {
    if (order === null) continue;

    let productsHtml = '';

    order.products.forEach((productItem) => {
      const matchingProduct = getProduct(productItem.productId);

      if (!matchingProduct) {
        console.warn("Missing product details for product ID:", productItem.productId, "in order:", order.id);
        return;
      }

      const deliveryOption = getDeliveryOption(productItem.deliveryOptionId);
      const deliveryDate = calculateDeliveryDate(deliveryOption);

      productsHtml += `
        <div class="order-details-grid items-center p-4 bg-white rounded-lg shadow-md mb-4">
          <div class="flex-none w-24 h-24 product-image-container">
            <img class="w-full h-full object-contain mx-auto" src="${matchingProduct.image}" alt="${matchingProduct.name}" />
          </div>
          <div class="text-center md:text-left">
            <div class="product-name text-lg font-semibold text-gray-800">${matchingProduct.name}</div>
            <div class="product-quantity text-gray-600">Qty: ${productItem.quantity}</div>
            <div class="product-price text-gray-700 font-medium">$${formatMoney(matchingProduct.priceCents)}</div>
            <div class="product-delivery-date text-sm text-gray-500 text-center md:text-left mt-2">
              Delivered on: <span class="font-semibold text-gray-700">${deliveryDate}</span>
            </div>
          </div>
          <div class="product-actions flex flex-col gap-2 text-center md:text-right">
            <button class="buy-again-button button-primary js-buy-again bg-yellow-400 text-gray-800 py-2 px-4 rounded-full hover:bg-yellow-500 transition-colors flex items-center justify-center"
              data-product-id="${matchingProduct.id}">
              <img class="buy-again-icon w-6 h-6 mr-2" src="images/icons/buy-again.png" alt="Buy Again Icon">
              <span class="buy-again-message">Buy it again</span>
            </button>
            <button 
              class="track-package-button js-track-package bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors"
              data-order-id="${order.id}" 
              data-product-id="${productItem.productId}">
              Track Package
            </button>
          </div>
        </div>
      `;
    });

    ordersHtml += `
      <div class="order-container bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <div class="order-header flex flex-col md:flex-row justify-between items-center bg-gray-200 p-4 rounded-t-lg mb-4">
          <div class="order-header-left-section flex flex-col md:flex-row gap-4">
            <div class="order-date text-center md:text-left">
              <div class="order-header-label text-sm font-medium text-gray-600">Order Placed:</div>
              <div class="text-base font-semibold text-gray-800">${new Date(order.orderTime).toDateString()}</div>
            </div>
            <div class="order-total text-center md:text-left">
              <div class="order-header-label text-sm font-medium text-gray-600">Total:</div>
              <div class="text-base font-semibold text-gray-800">$${formatMoney(order.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section mt-4 md:mt-0 text-center md:text-right">
            <div class="order-header-label text-sm font-medium text-gray-600">Order ID:</div>
            <div class="text-base font-semibold text-gray-800">${order.id}</div>
          </div>
        </div>
        <div class="order-products">
          ${productsHtml}
        </div>
      </div>
    `;
  }

  document.querySelector('.js-order-grid').innerHTML = ordersHtml;
  console.log('Orders HTML generated and displayed successfully.');

  document.querySelectorAll('.js-buy-again').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
    });
  });

  document.querySelectorAll('.js-track-package').forEach(button => {
    button.addEventListener('click', () => {
      const orderId = button.dataset.orderId;
      const productId = button.dataset.productId;
      window.location.href = `tracking.html?orderId=${orderId}&productId=${productId}`;
    });
  });
}

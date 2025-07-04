import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatMoney } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function rednderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach(cartItem => {
    const product = getProduct(cartItem.productId); // fixed typo: productID -> productId

    if (!product) {
      console.warn("Missing product for", cartItem);
      return;
    }

    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    if (!deliveryOption) {
      console.warn("Missing delivery option for", cartItem);
      return;
    }

    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const taxCents = 0.1 * totalBeforeTax;
  const totalCents = taxCents + totalBeforeTax;

  const paymentSummaryHtml = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div class="js-items">Items (3):</div>
      <div class="payment-summary-money js-payment-summary">$${formatMoney(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatMoney(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatMoney(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatMoney(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatMoney(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart })
      });

      const order = await response.json();
      addOrder(order);
      console.log(order);
    } catch (error) {
      console.error("Failed to place order:", error);
    }
    window.location.href = 'orders.html'
  });

  updateCartQuantityDisplay();
}

function updateCartQuantityDisplay() {
  const quantity = calculateCartQuantity();

  if (quantity === 0) {
    document.querySelector('.js-items').innerHTML = `Your cart is empty`;
  } else {
    document.querySelector('.js-items').innerHTML = `Items(${quantity}):`;
  }
}

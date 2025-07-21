// Import the orders and product data
import { orders } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import { calculateCartQuantity } from '../data/cart.js';

// Function to calculate dynamic progress
function calculateProgress(orderedProduct, orderTime) {
  const currentDate = new Date();
  const deliveryDate = new Date(orderedProduct.estimatedDeliveryTime);
  const orderDate = new Date(orderTime);
  
  // Calculate total time from order to delivery (in milliseconds)
  const totalTime = deliveryDate.getTime() - orderDate.getTime();
  
  // Calculate elapsed time from order to now
  const elapsedTime = currentDate.getTime() - orderDate.getTime();
  
  // Calculate percentage (0 to 100)
  let percentage = (elapsedTime / totalTime) * 100;
  
  // Clamp percentage between 0 and 100
  percentage = Math.max(0, Math.min(100, percentage));
  
  // Determine current status based on percentage
  let status = 'preparing';
  let statusText = 'Preparing';
  
  if (percentage <= 25) {
    status = 'preparing';
    statusText = 'Preparing';
  } else if (percentage <= 85) {
    status = 'shipped';
    statusText = 'Shipped';
  } else {
    status = 'delivered';
    statusText = 'Delivered';
  }
  
  // If current date is past delivery date, mark as delivered
  if (currentDate >= deliveryDate) {
    percentage = 100;
    status = 'delivered';
    statusText = 'Delivered';
  }
  
  return {
    percentage: Math.round(percentage),
    status: status,
    statusText: statusText,
    isDelivered: currentDate >= deliveryDate,
    daysRemaining: Math.max(0, Math.ceil((deliveryDate - currentDate) / (1000 * 60 * 60 * 24)))
  };
}

// Load products first
await loadProductsFetch();

// Grab the URL parameters (orderId and productId) from the current page URL
const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

// Find the specific order that matches the given orderId
const order = orders.find(order => order.id === orderId);

// Error handling - check if order exists
if (!order) {
  console.error('Order not found:', orderId);
  document.querySelector('.js-main').innerHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>
      <div class="error-message">
        Order not found. Please check your order ID.
      </div>
    </div>
  `;
} else {
  console.log(order);
  
  // Find the specific product within the order using the productId from the URL
  const orderedProduct = order.products.find(
    (product) => product.productId === productId
  );
  
  // Error handling - check if product exists in the order
  if (!orderedProduct) {
    console.error('Product not found in order:', productId);
    document.querySelector('.js-main').innerHTML = `
      <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>
        <div class="error-message">
          Product not found in this order.
        </div>
      </div>
    `;
  } else {
    // Get the general product details (name, image) using the found productId
    const matchingProduct = getProduct(productId);
    
    // Debug logging
    console.log('Ordered product:', orderedProduct);
    console.log('Matching product:', matchingProduct);
    
    // Error handling - check if product details exist
    if (!matchingProduct) {
      console.error('Product details not found:', productId);
      document.querySelector('.js-main').innerHTML = `
        <div class="order-tracking">
          <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
          </a>
          <div class="error-message">
            Product details not found.
          </div>
        </div>
      `;
    } else {
      // Calculate dynamic progress
      const progress = calculateProgress(orderedProduct, order.orderTime);
      
      // Format the delivery date for a better user experience
      const deliveryDate = new Date(orderedProduct.estimatedDeliveryTime);
      const deliveryDateString = deliveryDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
      
      // Generate the final HTML for the tracking page with dynamic progress
      const trackingHtml = `
        <div class="order-tracking">
          <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
          </a>
          
          <div class="delivery-date">
            ${progress.isDelivered ? 'Delivered' : `Arriving on ${deliveryDateString}`}
          </div>
          
          <div class="product-info">
            ${matchingProduct.name || 'Product name not available'}
          </div>
          
          <div class="product-info">
            Quantity: ${orderedProduct.quantity}
          </div>
          
          ${matchingProduct.image ? 
            `<img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.name || 'Product'}">` : 
            `<div class="product-image-placeholder">Image not available</div>`
          }
          
          <div class="progress-labels-container">
            <div class="progress-label ${progress.status === 'preparing' ? 'current-status' : ''}">
              Preparing
            </div>
            <div class="progress-label ${progress.status === 'shipped' ? 'current-status' : ''}">
              Shipped
            </div>
            <div class="progress-label ${progress.status === 'delivered' ? 'current-status' : ''}">
              Delivered
            </div>
          </div>
          
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${progress.percentage}%"></div>
          </div>
          
          ${progress.daysRemaining > 0 ? 
            `<div class="delivery-info">
              ${progress.daysRemaining} ${progress.daysRemaining === 1 ? 'day' : 'days'} remaining
            </div>` : 
            ''
          }
        </div>
      `;
      
      // Place the generated HTML into the page (using .js-main instead of .js-order-tracking)
      document.querySelector('.js-main').innerHTML = trackingHtml;
    }
  }
}

// Update the header
document.querySelector('.amazon-header').innerHTML = `
  <div class="amazon-header-left-section">
    <a href="amazon.html" class="header-link">
      <img class="amazon-logo" src="images/amazon-logo-white.png" alt="Amazon Logo">
      <img class="amazon-mobile-logo" src="images/amazon-mobile-logo-white.png" alt="Amazon Mobile Logo">
    </a>
  </div>
  
  <div class="amazon-header-middle-section">
    <input class="search-bar" type="text" placeholder="Search">
    
    <button class="search-button">
      <img class="search-icon" src="images/icons/search-icon.png" alt="Search">
    </button>
  </div>
  
  <div class="amazon-header-right-section">
    <a class="orders-link header-link" href="orders.html">
      <span class="returns-text">Returns</span>
      <span class="orders-text">& Orders</span>
    </a>
    
    <a class="cart-link header-link" href="checkout.html">
      <img class="cart-icon" src="images/icons/cart-icon.png" alt="Cart">
      <div class="cart-quantity">${calculateCartQuantity()}</div>
      <div class="cart-text">Cart</div>
    </a>
  </div>
`;
/*
LINE-BY-LINE EXPLANATION:

Line 1-3: Import statements
- Import the orders array from orders.js file
- Import getProduct function and loadProductsFetch function from products.js
- Import calculateCartQuantity function from cart.js

Line 5-6: Load products
- Call loadProductsFetch() with await to ensure products are loaded before proceeding
- This is asynchronous, so we wait for it to complete

Line 8-11: Extract URL parameters
- Create a new URL object from the current page's URL
- Extract 'orderId' parameter from the URL (e.g., from ?orderId=abc123)
- Extract 'productId' parameter from the URL (e.g., from &productId=def456)

Line 13-14: Find the order
- Search through the orders array to find the order with matching ID
- Uses Array.find() which returns the first matching order or undefined

Line 16-26: Error handling for missing order
- If no order was found (order is undefined/falsy)
- Log an error message to console
- Display an error page with a link back to orders
- Early return prevents further execution

Line 27-29: Success path for found order
- Log the found order to console for debugging
- Continue with processing the order

Line 31-34: Find specific product in the order
- Search through the order's products array
- Find the product that matches the productId from URL
- Returns the ordered product object with quantity and delivery info

Line 36-46: Error handling for product not in order
- If the product isn't found in this specific order
- Display error message and back link
- This handles cases where URL has wrong product ID for the order

Line 48-52: Get full product details
- Use getProduct() function to get complete product info (name, image, etc.)
- This gives us the product catalog information
- Add debug logging to see what data we retrieved

Line 54-64: Error handling for missing product details
- If getProduct() returns null/undefined
- Display error message
- This handles cases where productId doesn't exist in product catalog

Line 66-70: Format delivery date
- Convert the ISO date string to a JavaScript Date object
- Format it as a readable string (e.g., "Monday, July 26")
- Uses US locale formatting with weekday, month, and day

Line 72-105: Generate tracking page HTML
- Create template string with all the tracking information
- Include back link to orders page
- Display formatted delivery date
- Show product name with fallback text if missing
- Display quantity from the order
- Conditionally render image or placeholder based on availability
- Create progress indicators (Preparing → Shipped → Delivered)
- Add progress bar container for visual progress

Line 107-109: Insert HTML into page
- Find the .js-main element in the DOM
- Replace its content with our generated tracking HTML

Line 113-140: Generate and insert header HTML
- Create the Amazon-style header
- Left section: Logo and home link
- Middle section: Search bar and button
- Right section: Orders link and cart with quantity
- Use calculateCartQuantity() to show current cart count
- Insert this HTML into the .amazon-header element

Key concepts used:
- ES6 modules (import/export)
- Async/await for loading data
- URL API for parameter extraction
- Array.find() for searching
- Template literals for HTML generation
- Error handling with conditional statements
- DOM manipulation with querySelector and innerHTML
*/
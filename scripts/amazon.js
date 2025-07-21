import {cart,addToCart, calculateCartQuantity} from '../data/cart.js';
import {products,loadProductsFromBackend} from '../data/products.js';
import { formatMoney } from './utils/money.js';

// Read URL parameters for search functionality
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search');

loadProductsFromBackend(renderProductsGrid);

function renderProductsGrid(){
  // Start with all products
  let productsToShow = products;
  
  // If there's a search term, filter the products
  if (searchTerm){
    console.log('Searching for:', searchTerm); // DEBUG
    console.log('Total products before filter:', products.length); // DEBUG
    
    productsToShow = products.filter(product => {
      const searchLower = searchTerm.toLowerCase();
      
      // Check if product name contains search term
      const nameMatch = product.name.toLowerCase().includes(searchLower);
      
      // Check if any keyword contains search term (with safety check for undefined keywords)
      const keywordMatch = product.keywords && product.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchLower)
      );
      
      // DEBUG: Log each product's match status
      console.log(`Product: ${product.name}`);
      console.log(`  Name match: ${nameMatch}`);
      console.log(`  Has keywords: ${!!product.keywords}`);
      console.log(`  Keywords: ${product.keywords}`);
      console.log(`  Keyword match: ${keywordMatch}`);
      console.log(`  Overall match: ${nameMatch || keywordMatch}`);
      
      // Return true if either name OR keywords match
      return nameMatch || keywordMatch;
    });
    
    console.log('Products after filter:', productsToShow.length); // DEBUG
  }

  let productsHTML = ' ';
  
  // Generate HTML for each product (filtered or all)
  productsToShow.forEach((product)=>{
    productsHTML += `<div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            ${product.extraInfoHtml()}

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>`;
  });

  // Update the DOM with the generated HTML
  document.querySelector('.js-products-grid').innerHTML = productsHTML;
  updateCartQuantityDisplay();
  
  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
    button.addEventListener('click',()=>{
      const productID = button.dataset.productId;
      addToCart(productID);
      updateCartQuantityDisplay();
    });
  });
  
  function updateCartQuantityDisplay() {
    const quantity = calculateCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = quantity;
  }
}

/*
=== README: How the Search Functionality Works ===

## Overview
This code implements a search feature that filters products based on user input. Users can search by product name or keywords, and the page will display only matching products.

## How It Works

### 1. URL Parameter Reading
```javascript
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search');
```
- When the page loads, it checks the URL for a search parameter
- Example: `amazon.html?search=basketball` → searchTerm = "basketball"
- If no search parameter exists, searchTerm = null

### 2. Product Filtering
```javascript
if (searchTerm){
  productsToShow = products.filter(product => {
    // Filter logic here
  });
}
```
- If a search term exists, filter the products array
- If no search term, show all products
- Uses Array.filter() to create a new array with only matching products

### 3. Search Logic
The search checks two things:
- **Product Name**: Does the product name contain the search term?
- **Keywords**: Do any of the product's keywords contain the search term?

### 4. Safety Check
```javascript
const keywordMatch = product.keywords && product.keywords.some(keyword => 
  keyword.toLowerCase().includes(searchLower)
);
```
- Uses `&&` to check if keywords exist before calling .some()
- Prevents "Cannot read properties of undefined" error
- If keywords don't exist, keywordMatch becomes false

### 5. Case-Insensitive Search
```javascript
const searchLower = searchTerm.toLowerCase();
product.name.toLowerCase().includes(searchLower)
```
- Converts both search term and product data to lowercase
- Makes search case-insensitive: "Basketball" matches "basketball"

## Example Flow
1. User types "sports" in search bar
2. Search button redirects to: `amazon.html?search=sports`
3. Page loads, reads "sports" from URL
4. Filters products where:
   - Name contains "sports" OR
   - Any keyword contains "sports"
5. Displays only matching products

## Product Data Structure Expected
```javascript
{
  "id": "...",
  "name": "Product Name",
  "keywords": ["keyword1", "keyword2"], // Optional - can be missing
  // ... other properties
}
```

## Error Prevention
- Handles products without keywords property
- Uses safe navigation with && operator
- Case-insensitive matching prevents missed results
*/
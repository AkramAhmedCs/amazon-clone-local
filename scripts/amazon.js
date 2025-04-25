import {cart} from '../data/cart.js';
// u can rename the import to whatever u want ex importing cart as myCart
//with modules u dont have to worry about the order of the script tags in the html file
//well create an array to contain an array of objects each of which representing a product
/*
const products = [{
  image : 'images/products/athletic-cotton-socks-6-pairs.jpg',
  name :'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating :{
    stars : 4.5,
    count : 87
  },
  priceInCents : 1090
},
{
  image:'images/products/intermediate-composite-basketball.jpg',
  name:'Intermediate Composite Basketball',
  rating:{
    stars:4,
    count:127
  },
  priceInCents:2095
},
{
  image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name:'Adults Plain Cotton T-Shirt - 2 Pack - Teal',
  rating:{
    stars:4.5,
    count:56
  },
  priceInCents:799
},
{
  image:'images/products/black-2-slot-toaster.jpg',
  name:' 2 Slot Toaster-black',
  rating:{
    stars:5,
    count:2197
  },
  priceInCents:1899
}

];
*/


//we will just get the products array from the json file 
let productsHTML = ' ';
//we multiply the rating by 10 to get the actual rating in the image
products.forEach((product)=>{
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
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
          $${(product.priceCents/100).toFixed(2)}
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


document.querySelector('.js-products-grid').innerHTML = productsHTML;
document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
  button.addEventListener('click',()=>{
   const productID = button.dataset.productId;
    let matchingItem;
   cart.forEach((item)=>{
    if(item.productID === productID){
      matchingItem = item;
    }
   });
  if(matchingItem){
    matchingItem.quantity++;
  }else{
    cart.push({productID:productID,
      quantity:1
    });
  }

  let cartQuantity = 0;
  cart.forEach((item)=>{
    cartQuantity += item.quantity;
  })
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
 
    });
       });

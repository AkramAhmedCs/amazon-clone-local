// the hash makes a property private 

class Cart {
  cartItems;
  #localStorageKey;
  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    if (!this.cartItems) {
      this.cartItems = [{
        productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productID: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
  }
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }
  removeFromCart(productID) {
    const newCart = [];
    this.cartItemsart.forEach((cartItem => {
      if (cartItem.productID !== productID) {
        newCart.push(cartItem);
      }
    }));
    this.cartItemsart = newCart;
    this.saveToStorage();
  }
  addToCart(productID) {
  let matchingItem;
  this.cartItems.forEach((Cartitem) => {
    if (Cartitem.productID === productID) {
      matchingItem = Cartitem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    this.cartItems.push({
      productID: productID,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  this.saveToStorage();
}

removeFromCart(productID) {
  const newCart = [];
  this.cartItems.forEach((cartItem) => {
    if (cartItem.productID !== productID) {
      newCart.push(cartItem);
    }
  });
  this.cartItems = newCart;
  this.saveToStorage();
}
  updateDeliveryOption(productID, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productID === productID) {
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    } else {
      return;
    }
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  updateQuantity(productID, newQuantity) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productID === productID) {
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    }
  }
}



const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');
console.log(cart)
console.log(businessCart)

console.log(businessCart instanceof Cart)
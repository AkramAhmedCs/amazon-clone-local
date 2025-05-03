export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart = [{
    productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productID: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productID){

  let matchingItem;
   cart.forEach((Cartitem)=>{
    if(Cartitem.productID === productID){
      matchingItem = Cartitem;
    }
   });
  if(matchingItem){
    matchingItem.quantity++;
  }else{
    cart.push({productID:productID,
      quantity:1,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();

}
export function removeFromCart(productID){
  const newCart = [];
  cart.forEach((cartItem=>{
    if(cartItem.productID!==productID){
      newCart.push(cartItem);
    }
  }))
  cart = newCart;
  saveToStorage();
}
export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}
export function updateQuantity(productID,newQuantity){
let matchingItem;
cart.forEach((cartItem)=>{
  if(cartItem.productID === productID){
    matchingItem = cartItem;
  }
})
if(matchingItem){
  matchingItem.quantity = newQuantity;
  saveToStorage();
}
}
export function updateDeliveryOption(productID,deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(cartItem.productID ===productID){
      matchingItem = cartItem;
    }
  });
  if(matchingItem){
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
  else{
    console.log('product not found')
  }
  
}
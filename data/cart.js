export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart = [];
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
      quantity:1
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
export const cart = [];
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

}
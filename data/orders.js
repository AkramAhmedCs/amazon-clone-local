export const orders  = JSON.parse(localStorage.getItem('orders'))|| [];

//either get the saved orders, if none exist , return empty array 

export function addOrder(order){
  orders.unshift(order)
  //unshift allows u to add something to the front of the array not the back cuz we want the most recent order to be at the front
  saveToStorage();
}


 function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders));

}
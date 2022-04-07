// ! this page is responsible for displaying the cart items when the user clicks on the shopping cart icon

let cart = document.querySelector('.carts-products div'); // this is the cart products menu
let badge = document.querySelector('.badge'); // the number of products added above the cart icon
let cartProducts = document.querySelector('.carts-products'); // the products UI after clicking 'view all productsItem'
let shoppingCart = document.querySelector('.shoppingCart'); // the shopping cart icon
shoppingCart.addEventListener('click', openCartMenu);


let addedItems = localStorage.getItem('productsInCart')
  ? JSON.parse(localStorage.getItem('productsInCart'))
  : [];
(function dontDissapear() {
  if (addedItems) {
    addedItems.map(item => {
      cart.innerHTML += `<p>${item.title} x${item.qty}</p>`;
    });
    badge.style.display = 'block';
    badge.innerHTML = addedItems.length;
    if (addedItems.length === 0) {
      badge.style.display = 'none';
    }
  }
})();

function openCartMenu() {
  if (addedItems.length === 0) {
    cartProducts.style.display = 'none';
  }
  if (addedItems.length != 0 && cartProducts.style.display != 'block') {
    cartProducts.style.display = 'block';
  } else {
    cartProducts.style.display = 'none';
  }
}

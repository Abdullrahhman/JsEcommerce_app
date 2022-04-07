

let productsDom = document.querySelector('.products'); // wehere the products should be displayed
let logo = document.querySelector('.brand'); // this is the logo
let inCart = document.querySelector('.add-to-cart'); // add to cart btn
// let badge = document.querySelector('.badge'); // the number of products added above the cart icon
// let cart = document.querySelector('.carts-products div'); // this is the cart products menu
// let shoppingCart = document.querySelector('.shoppingCart'); // the shopping cart icon
// let cartProducts = document.querySelector('.carts-products'); // the products UI after clicking 'view all productsItem'
let productsItem = JSON.parse(localStorage.getItem('products'));
let searchInput = document.querySelector('#search');
let products = productsDb;

// redirect user when clicks on the logo
logo.addEventListener('click', redirectPage);

function redirectPage() {
  if ((window.location = 'index.html')) {
    window.location = 'index.html';
  }
}

// this function defines the products UI (home page)
let drawUI;
(drawUI = function (products = []) {
  let productsUI = products.map(item => {
    return `
        <div class="product-item" style="border: ${
          item.isMine === 'true' ? '2px solid red' : '1px solid black'
        } " >
            <img class="product-item-img" src="${item.imgUrl}" />
            <div class="product-item-desc">
              <a onclick='saveItemData(${item.id})'>${item.title}</a>
              <p>
                ${item.desc}
              </p>
              <span>${item.seller}</span>
              <h3 id='price'>${item.price}</h3>
            </div>
            <div class="product-item-actions">
              <button onclick="addedToCart(${
                item.id
              })" class="add-to-cart">Add To Cart</button>
              <i style="color: ${
                item.liked == true ? 'red' : ''
              }" onclick='addToFav(${item.id})' class="fa-solid fa-heart"></i>
              </div>
          </div>
        `;
  });
  productsDom.innerHTML = productsUI.join('');
})(JSON.parse(localStorage.getItem('products')) || products);

let pdDesc = document.querySelector('.product-item-desc span');

// this function is the one who adds the items to the cart

function addedToCart(id) {
  if (localStorage.getItem('username')) {
    let products = JSON.parse(localStorage.getItem('products')) || products;
    let product = products.find(item => item.id === id);
    let isProductInCart = addedItems.some(i => i.id === product.id);

    if (isProductInCart) {
      addedItems = addedItems.map(p => {
        if (p.id === product.id) p.qty += 1;
        return p;
      });
    } else {
      addedItems.push(product);
    }
    cart.innerHTML = '';
    addedItems.forEach(item => {
      cart.innerHTML += `<p>${item.title} x${item.qty}</p>`;
    });
  }

  // addedItems = [...addedItems, choosenItem];
  let uniqueProducts = getUniqueArr(addedItems, 'id');
  localStorage.setItem('productsInCart', JSON.stringify(uniqueProducts));
  // make sure the user has been looged in.
  if (localStorage.getItem('username')) {
    let productsLength = document.querySelectorAll('.carts-products div p');
    badge.style.display = 'block';
    badge.innerHTML = productsLength.length;
  } else {
    setTimeout(() => {
      window.location = 'login.html';
    }, 750);
  }
}

// saves the id of the clicked product and redirect to the details page
function saveItemData(id) {
  localStorage.setItem('productId', id);
  window.location = 'cartdetails.html';
}

// searchbar function
searchInput.addEventListener('keyup', function (e) {
  search(e.target.value, JSON.parse(localStorage.getItem('products')));
  if (e.target.value.trim() === '') {
    drawUI(JSON.parse(localStorage.getItem('products')));
  }
});

function search(title, arr) {
  let myArr = arr.filter(
    item => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
  );
  drawUI(myArr);
}

// add to favorite
let favItems = localStorage.getItem('favProducts')
  ? JSON.parse(localStorage.getItem('favProducts'))
  : [];

function getUniqueArr(arr, id) {
  let unique = arr
    .map(item => item[id])
    .map((item, index, finalArr) => finalArr.indexOf(item) === index && index)
    .filter(item => arr[item])
    .map(item => arr[item]);
  return unique;
}

function addToFav(id) {
  if (localStorage.getItem('username')) {
    let product = productsItem.find(item => item.id === id);
    let isProductInFav = favItems.some(i => i.id === product.id);
    if (isProductInFav) {
      favItems = favItems.map(p => {
        if (p.id === product.id) p.liked = true;
        return p;
      });
    } else {
      favItems.push(product);
    }
    localStorage.setItem('favProducts', JSON.stringify(favItems));
    products.map(item => {
      if (item.id === product.id) {
        item.liked = true;
      }
    });
    localStorage.setItem('products', JSON.stringify(products));
    drawUI(products);
  } else {
    setTimeout(() => {
      window.location = 'login.html';
    }, 750);
  }
}

// make sure that the existing items added to the localstorage.
!localStorage.getItem('products')
  ? localStorage.setItem('products', JSON.stringify(products))
  : null;

// this func is responsible for the filtering.
let sellerFilter = document.querySelector('#seller-filter');
sellerFilter.addEventListener('change', filterBySeller);
function filterBySeller(e) {
  let val = e.target.value;
  let products = JSON.parse(localStorage.getItem('products')) || products;

  if (val === 'all') {
    drawUI(products);
  } else {
    products = products.filter(i => i.seller === val);
    drawUI(products);
  }
}

// this func edits the product that the user created.
function editProducts(id) {
  localStorage.setItem('editProduct', id);
  window.location = 'editProduct.html';
}


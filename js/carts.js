let productsDom = document.querySelector('.products');
let msg = document.querySelector('.empty-items');

// draws the UI of the cart page
function drawCartItemsUI(allProducts = []) {
  // the following if statment is to check if there's no items in the cart so it can display the msg
  if (JSON.parse(localStorage.getItem('productsInCart')).length === 0) {
    msg.innerHTML = "You Don't Have Any Items In Your Cart.";
  }

  let products =
    JSON.parse(localStorage.getItem('productsInCart')) || allProducts;
  let productsInCart = products.map(item => {
    return `
        <div class="product-item">
            <img class="product-item-img" src="${item.imgUrl}" alt="mic" />
            <div class="product-item-desc">
              <h2>${item.title}</h2>
              <p>
                ${item.desc}
              </p>
              <span class='seller'>${item.seller}</span>
              <h3>${item.price}</h3> 
              </div>
              <span class='qty'>x${item.qty}</span> 
            <div class="product-item-actions">
              <button onclick="removeFromCart(${item.id})" class="add-to-cart">Remove item</button>
            </div>
          </div>
        `;
  });
  productsDom.innerHTML = productsInCart.join('');
}
drawCartItemsUI();

// this function removes items from the cart
function removeFromCart(id) {
  let productsInCart = localStorage.getItem('productsInCart');
  if (productsInCart) {
    let items = JSON.parse(productsInCart);
    let filtered = items.filter(item => item.id != id);
    localStorage.setItem('productsInCart', JSON.stringify(filtered));
    drawCartItemsUI(filtered);
  }
}

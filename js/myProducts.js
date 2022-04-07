let products = JSON.parse(localStorage.getItem('products')) || productsDb;
let productsDom = document.querySelector('.products'); // wehere the products should be displayed
let msg = document.querySelector('.empty-items');

let drawUI;
(drawUI = function (products = []) {
  let myProducts = products.filter(item => item.isMine === 'true');
  if (myProducts.length != 0) {
    let productsUI = myProducts.map(item => {
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
            
              <button class='edit-btn' style="display: ${
                item.isMine === 'true' ? 'block' : 'none'
              };" onclick="editProducts(${item.id})" >Edit Product</button>
      <button class='delete-btn' style="display: ${
        item.isMine === 'true' ? 'block' : 'none'
      };" onclick="deleteProduct(${item.id})" >Delete Product</button>
              </div>
          </div>
        `;
    });
    productsDom.innerHTML = productsUI.join('');
  } else {
    msg.innerHTML = `You Don't Have Any Created Items`;
  }
})(JSON.parse(localStorage.getItem('products')) || productsDb);

function editProducts(id) {
  localStorage.setItem('editProduct', id);
  window.location = 'editProduct.html';
}

function deleteProduct(id) {
  let products = JSON.parse(localStorage.getItem('products')) || productsDb;
  let myProducts = products.filter(item => item.isMine === 'true');
  let filtered = myProducts.filter(i => i.id !== id);
  let clickedItem = myProducts.find(i => i.id === id);
  products = products.filter(i => i.id !== clickedItem.id);
  console.log(products);
  localStorage.setItem('products', JSON.stringify(products));
  drawUI(filtered);
}

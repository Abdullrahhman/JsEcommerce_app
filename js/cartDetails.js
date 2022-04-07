let prodcuts = JSON.parse(localStorage.getItem('products')); // to get the data from the database
let prodcutId = localStorage.getItem('productId'); // to catch the id of each product
let itemDom = document.querySelector('.item-details'); // here where all the information displays

// here we get the data for the product we clicked on
let productDetails = prodcuts.find(item => item.id == prodcutId);

// here we display the data we got to the UI
itemDom.innerHTML = `
        <img src="${productDetails.imgUrl}" alt="" />
        <h2>${productDetails.title}</h2>
        <p>${productDetails.desc}</p>
        <span>${productDetails.seller}</span>
        <h3>${productDetails.price}</h3>
        <button class='edit-long-btn' onclick='editProduct(${prodcutId})'>Edit Product</button>
        `;

// this function colors the seller if it was verified or not.
(function colorSeller() {
  let seller = document.querySelector('.item-details span');
  if (seller.innerHTML === 'seller: verified ✓') {
    seller.style.color = 'green';
  } else {
    seller.style.color = 'red';
  }
})();

function editProduct(id) {
  localStorage.setItem('editProduct', id);
  window.location = 'editProduct.html';
}

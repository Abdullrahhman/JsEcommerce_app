// variable declaration
let products = JSON.parse(localStorage.getItem('products')) || productsDb;
let productId = JSON.parse(localStorage.getItem('editProduct'));
let getProduct = products.find(i => i.id === productId);
let productName = document.querySelector('#product-name');
let productDesc = document.querySelector('#product-desc');
let productSellerSelect = document.querySelector('#seller');
let productPrice = document.querySelector('#product-price');
let updateForm = document.querySelector('#update-form');
let productSellerInfo;
let inputFile = document.querySelector('#product-img');
let productImg;

productName.value = getProduct.title;
productDesc.value = getProduct.desc;
productSellerSelect.value = getProduct.seller;
productPrice.value = getProduct.price;
productImg = getProduct.imgUrl;
// events
productSellerSelect.addEventListener('change', getSellerInfo);
updateForm.addEventListener('submit', updateProduct);
inputFile.addEventListener('change', uploadImage);

// functions
function getSellerInfo(e) {
  productSellerInfo = e.target.value;
}

function updateProduct(e) {
  e.preventDefault();

  getProduct.title = productName.value;
  getProduct.desc = productDesc.value;
  getProduct.seller = productSellerSelect.value;
  getProduct.imgUrl = productImg;

  localStorage.setItem('products', JSON.stringify(products));

  setTimeout(() => {
    window.location = 'index.html';
  }, 750);
}

function uploadImage() {
  let file = this.files[0];
  let fileType = ['image/png', 'image/jpeg'];
  if (fileType.indexOf(file.type) !== -1) {
    if (file.size > 2 * 1024 * 1024) {
      alert('image is too big.');
      inputFile.value = '';
      return;
    }
    productImg = URL.createObjectURL(file);
    getImageBase64(file);
    return;
  }
  if (fileType.indexOf(file.type) === -1) {
    inputFile.value = '';
    alert('Only Images.');
  }
}

function getImageBase64(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function () {
    productImg = reader.result;
  };

  reader.onerror = function () {
    alert('something went wrong');
  };
}

// variable declaration
let productName = document.querySelector('#product-name');
let productDesc = document.querySelector('#product-desc');
let productSellerSelect = document.querySelector('#seller');
let productPrice = document.querySelector('#product-price');
let createForm = document.querySelector('#create-form');
let productSellerInfo;
let productsData = productsDb;
let inputFile = document.querySelector('#product-img');
let productImg;

//events
productSellerSelect.addEventListener('change', getSellerInfo);
createForm.addEventListener('submit', createProduct);

// functions
function getSellerInfo(e) {
  productSellerInfo = e.target.value;
}

function createProduct(e) {
  e.preventDefault();
  if (localStorage.getItem('username')) {
    // the variables we will be using
    let allProducts =
      JSON.parse(localStorage.getItem('products')) || productsData; // this var catches all the products that's available in the database (localstorage)
    let nameVal = productName.value; // this var catches the name that the user enters
    let descVal = productDesc.value;
    let priceVal = productPrice.value;
    // in this object we save the product that the user creates
    let obj = {
      id: allProducts ? allProducts.length + 1 : 1,
      title: nameVal,
      desc: descVal,
      seller: productSellerInfo,
      imgUrl: productImg,
      price: priceVal,
      qty: 1,
      isMine: 'true',
    };
    if (
      nameVal === '' ||
      descVal === '' ||
      priceVal === '' ||
      inputFile.value === ''
    ) {
      alert('please fill the data');
    } else {
      let newProducts = allProducts ? [...allProducts, obj] : [obj];
      localStorage.setItem('products', JSON.stringify(newProducts));
      window.location = 'index.html';
    }
  } else {
    window.location = 'login.html';
  }
}

inputFile.addEventListener('change', uploadImage);

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

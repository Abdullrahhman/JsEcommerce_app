// get data from the database
let get_username = localStorage.getItem('username');
let get_email = localStorage.getItem('email');
let products = JSON.parse(localStorage.getItem('products')) || productsDb;
let myProducts = products.filter(i => i.isMine === 'true');

// variables
let productLenth = document.querySelector('#produtLength span');
let userDom = document.querySelector('#username');
let useremail = document.querySelector('#email');
let userAvatar = document.querySelector('.user-avatar');

userDom.innerHTML = get_username;
useremail.innerHTML = get_email;
productLenth.innerHTML = myProducts.length;


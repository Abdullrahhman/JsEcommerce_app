// get data from the database
let get_username = localStorage.getItem('username');
let get_email = localStorage.getItem('email');
let products = JSON.parse(localStorage.getItem('products')) || productsDb;
let myProducts = products.filter(i => i.isMine === 'true');

// variables
let changeName = document.querySelector('#changeName');
let changeEmail = document.querySelector('#changeEmail');
let submitBtn = document.querySelector('#submitBtn');

changeName.value = get_username;
changeEmail.value = get_email;

submitBtn.addEventListener('click', submitBtnfunc);

function submitBtnfunc(e) {
  e.preventDefault();

  localStorage.setItem('username', changeName.value);
  localStorage.setItem('email', changeEmail.value);
  setTimeout(() => {
    window.location = 'profile.html';
  }, 750);
}


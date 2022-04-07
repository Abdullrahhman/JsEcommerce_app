//* declaring the form variables.
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const register_btn = document.querySelector('#signup');

register_btn.addEventListener('click', register);



function register(e) {
  e.preventDefault();
  if (username.value === '' || email.value === '' || password.value === '') {
    alert('Please Fill All The Data.');
  } else {
    localStorage.setItem('username', username.value);
    localStorage.setItem('email', email.value);
    localStorage.setItem('password', password.value);
    setTimeout(() => {
      window.location = 'login.html';
    }, 750);
  }
}

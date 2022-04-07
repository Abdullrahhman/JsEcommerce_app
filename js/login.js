const username = document.querySelector('#lgusername');
const password = document.querySelector('#lgpassword');
const signin_btn = document.querySelector('#lgsignin');

signin_btn.addEventListener('click', login);


function login(e) {
  e.preventDefault();
  let checkusername = localStorage.getItem('username');
  let checkuspassword = localStorage.getItem('password');
  if (username.value === '' || password.value === '') {
    alert('Please Fill All The Data.');
  } else if (
    checkusername.trim() == username.value.trim() &&
    checkuspassword == password.value
  ) {
    setTimeout(() => {
      window.location = 'warning.html';
    }, 750);
  } else if (
    checkusername != username.value ||
    checkuspassword != password.value
  ) {
    alert('Username or Password is Wrong');
  }
}

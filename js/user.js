// ! this whole page is about the displaying user information after signing up
let links = document.querySelector('#links');
let userinfo = document.querySelector('#user_info');
let user = document.querySelector('#user');
let logoutBtn = document.querySelector('#logout_btn');

// check if user is registered
let checkusername = localStorage.getItem('username');
if (checkusername) {
  links.remove();
  userinfo.style.display = 'flex';
  user.innerHTML = checkusername;
  user.style.textTransform = 'capitalize';
} else {
  userinfo.remove();
  links.style.display = 'flex';
}
// delete all data after logging out.
logoutBtn.addEventListener('click', function () {
  localStorage.clear();
  setTimeout(() => {
    window.location = 'login.html';
  }, 750);
});

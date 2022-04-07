let getLang = localStorage.getItem('langDir');
if (getLang) {
  if (getLang === 'rtl') {
    changeLangToAr();
  } else {
    changeLangToEn();
  }
}

let ar = document.querySelector('#ar_lang');
let en = document.querySelector('#en_lang');

ar.addEventListener('click', changeLangToAr);
en.addEventListener('click', changeLangToEn);

function changeLangToAr() {
  let dir = 'rtl';
  document.documentElement.setAttribute('dir', dir);
  localStorage.setItem('langDir', dir);
}

function changeLangToEn() {
  let dir = 'ltr';
  document.documentElement.setAttribute('dir', dir);
  localStorage.setItem('langDir', dir);
}

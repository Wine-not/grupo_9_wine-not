const openMark = document.querySelector('.navbar__menu-icon');
const closeMark = document.querySelector('.mobile-menu__close');
const nav = document.querySelector('.mobile-menu');

openMark.addEventListener('click', () => {
  nav.style.width = '100%';
});

closeMark.addEventListener('click', () => {
  nav.style.width = '0%';
});

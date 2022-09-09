// MOBILE MENU
const openMark = document.querySelector('.navbar__menu-icon');
const closeMark = document.querySelector('.mobile-menu__close');
const nav = document.querySelector('.mobile-menu');

openMark.addEventListener('click', () => {
  nav.style.width = '100%';
});

closeMark.addEventListener('click', () => {
  nav.style.width = '0%';
});

// FORM INPUT PRODUCT DETAIL

const buttons = [...document.querySelectorAll('.qty__button')];
let newValue;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    let oldValue = Number(
      buttons[0].parentElement.querySelector('input').value
    );

    if (button.textContent == '+') {
      newValue = oldValue + 1;
    }

    if (button.textContent == '-') {
      if (oldValue > 0) {
        newValue = oldValue - 1;
      } else {
        newValue = 0;
      }
    }

    buttons[0].parentElement.querySelector('input').value = newValue;
  });
});

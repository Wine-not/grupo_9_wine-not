// Inputs
form = document.querySelector('form');
prodName = document.querySelector('#name');
price = document.querySelector('#price');
brand = document.querySelector('#brand');
grape = document.querySelector('#grape');
rating = document.querySelector('#rating');
region = document.querySelector('#region');
stock = document.querySelector('#stock');
description = document.querySelector('#description');

// Inputs messages
nameMsg = document.querySelector('#name-msg');
priceMsg = document.querySelector('#price-msg');
brandMsg = document.querySelector('#brand-msg');
grapeMsg = document.querySelector('#grape-msg');
ratingMsg = document.querySelector('#rating-msg');
regionMsg = document.querySelector('#region-msg');
stockMsg = document.querySelector('#stock-msg');
descMsg = document.querySelector('#desc-msg');

const lengthCheck = (input, length) => {
  let qty = [];
  
  if (input === 'Backspace') {
    qty.pop();
  } else {
    qty.push(input);
  }
  
  return qty.length < length;
}

const isInt = number => {
  return Number.isInteger(number);
}

const checkRating = input => {
  return input >= 1 && input <= 5;
}

let lettersQty = []

prodName.addEventListener('keydown', e => {
  if (e.key === 'Backspace') {
    lettersQty.pop();
  } else {
    lettersQty.push(e.key);
  }
  
  let flag = null;
  
  if (lettersQty.length < 20) {
    nameMsg.innerText = 'Necesito más texto';
    prodName.classList.remove('valid');
    prodName.classList.add('invalid');
    nameMsg.classList.add('form__message');
    flag = false;
  } else {
    nameMsg.innerText = '';
    prodName.classList.remove('invalid');
    prodName.classList.add('valid');
    nameMsg.classList.remove('form__message');
    flag = true;
  }
  
  console.log(lettersQty);
  console.log(flag);
})
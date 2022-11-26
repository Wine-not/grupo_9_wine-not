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
  return input.value.length >= length;
}

const isInt = number => {
  return Number.isInteger(number);
}

const checkRating = input => {
  return input >= 1 && input <= 5;
}

const realTimeValidation = (element, validate, messageCont, errMessage) => {
  element.addEventListener('keydown', e => {
    if (validate) {
      e.classList.add('valid');
      e.classList.remove('invalid');
    } else {
      e.classList.remove('valid');
      e.classList.add('invalid');
      messageCont.innerText = errMessage;
    }
  })
}

realTimeValidation(prodName, lengthCheck(prodName, 5), nameMsg, 'Name must have more than 5 characters');
